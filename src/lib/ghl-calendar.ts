import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_CALENDAR_ID = "GpAHipyEcevlPgeso3ZO";
const GHL_LOCATION_ID = "gfYUTFnb4HXoCMB4p3Xk";
const GHL_TIMEZONE = "America/Los_Angeles";

const rangeSchema = z.object({
  startDate: z.number().int().nonnegative(),
  endDate: z.number().int().positive(),
});

const bookingSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(7).max(40),
  startTime: z.string().trim().min(10).max(80),
});

const requireToken = () => process.env.GHL_PRIVATE_INTEGRATION_TOKEN?.trim() || null;

const ghlRequest = async <T>(
  path: string,
  init: RequestInit,
  version: "v3" | "2023-02-21" = "v3",
): Promise<T> => {
  const token = requireToken();
  if (!token) throw new Error("GHL_NOT_CONFIGURED");

  const response = await fetch(`${GHL_API_BASE}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Version: version,
      ...(init.headers || {}),
    },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const apiMessage =
      typeof payload?.message === "string"
        ? payload.message
        : typeof payload?.error === "string"
          ? payload.error
          : "HighLevel request failed";
    throw new Error(`${apiMessage} (${response.status})`);
  }

  return payload as T;
};

export const getGhlAvailability = createServerFn({ method: "POST" })
  .validator(rangeSchema)
  .handler(async ({ data }) => {
    const token = requireToken();
    if (!token) {
      return { configured: false as const, timezone: GHL_TIMEZONE, days: {} };
    }

    const params = new URLSearchParams({
      startDate: String(data.startDate),
      endDate: String(data.endDate),
      timezone: GHL_TIMEZONE,
    });

    const days = await ghlRequest<Record<string, { slots?: string[] }>>(
      `/calendars/${GHL_CALENDAR_ID}/free-slots?${params.toString()}`,
      { method: "GET" },
      "v3",
    );

    return { configured: true as const, timezone: GHL_TIMEZONE, days };
  });

export const bookGhlAppointment = createServerFn({ method: "POST" })
  .validator(bookingSchema)
  .handler(async ({ data }) => {
    if (!requireToken()) return { configured: false as const };

    const contactResponse = await ghlRequest<{
      contact?: { id?: string };
      new?: boolean;
    }>(
      "/contacts/upsert",
      {
        method: "POST",
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          locationId: GHL_LOCATION_ID,
          source: "Website calendar",
        }),
      },
      "v3",
    );

    const contactId = contactResponse.contact?.id;
    if (!contactId) throw new Error("HighLevel did not return a contact ID.");

    const appointment = await ghlRequest<{
      id?: string;
      startTime?: string;
      endTime?: string;
      appointmentStatus?: string;
    }>(
      "/calendars/events/appointments",
      {
        method: "POST",
        body: JSON.stringify({
          title: `Consultation - ${data.fullName}`,
          calendarId: GHL_CALENDAR_ID,
          locationId: GHL_LOCATION_ID,
          contactId,
          startTime: data.startTime,
          appointmentStatus: "confirmed",
          ignoreDateRange: false,
          ignoreFreeSlotValidation: false,
          toNotify: true,
        }),
      },
      "2023-02-21",
    );

    return {
      configured: true as const,
      appointmentId: appointment.id || "",
      startTime: appointment.startTime || data.startTime,
      status: appointment.appointmentStatus || "confirmed",
    };
  });
