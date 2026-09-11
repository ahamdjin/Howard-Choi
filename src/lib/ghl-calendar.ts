import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_CALENDAR_ID = "GpAHipyEcevlPgeso3ZO";
const GHL_LOCATION_ID = "gfYUTFnb4HXoCMB4p3Xk";
const GHL_TIMEZONE = "America/Los_Angeles";
const BUSINESS_OPEN_MINUTES = 8 * 60;
const BUSINESS_CLOSE_MINUTES = 17 * 60;

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

type AvailabilityDays = Record<string, { slots?: string[] }>;

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

const pacificMinutes = (slot: string) => {
  const date = new Date(slot);
  if (Number.isNaN(date.getTime())) return -1;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: GHL_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? -1);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? -1);
  if (hour < 0 || minute < 0) return -1;
  return hour * 60 + minute;
};

const isBusinessHourSlot = (slot: string) => {
  const minutes = pacificMinutes(slot);
  return minutes >= BUSINESS_OPEN_MINUTES && minutes < BUSINESS_CLOSE_MINUTES;
};

const filterAvailabilityToBusinessHours = (days: AvailabilityDays): AvailabilityDays =>
  Object.fromEntries(
    Object.entries(days).map(([date, value]) => [
      date,
      { ...value, slots: (value?.slots || []).filter(isBusinessHourSlot) },
    ]),
  );

const fetchAvailability = async (startDate: number, endDate: number) => {
  const params = new URLSearchParams({
    startDate: String(startDate),
    endDate: String(endDate),
    timezone: GHL_TIMEZONE,
  });

  const days = await ghlRequest<AvailabilityDays>(
    `/calendars/${GHL_CALENDAR_ID}/free-slots?${params.toString()}`,
    { method: "GET" },
    "v3",
  );

  return filterAvailabilityToBusinessHours(days);
};

const normalizePhone = (phone: string) => {
  const trimmed = phone.trim();
  if (trimmed.startsWith("+")) return `+${trimmed.slice(1).replace(/\D/g, "")}`;

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return trimmed;
};

const hasSlot = (days: AvailabilityDays, requestedSlot: string) => {
  const requestedTime = new Date(requestedSlot).getTime();
  if (Number.isNaN(requestedTime)) return false;

  return Object.values(days).some((day) =>
    (day?.slots || []).some((slot) => new Date(slot).getTime() === requestedTime),
  );
};

const safeFailureReason = (message: string) => {
  if (/\b(401|403)\b/.test(message)) return "permissions" as const;
  if (/slot|availability|available|date range/i.test(message)) return "slot" as const;
  if (/phone|contact/i.test(message)) return "contact" as const;
  return "booking" as const;
};

export const getGhlAvailability = createServerFn({ method: "POST" })
  .validator(rangeSchema)
  .handler(async ({ data }) => {
    const token = requireToken();
    if (!token) {
      return { configured: false as const, timezone: GHL_TIMEZONE, days: {} };
    }

    const days = await fetchAvailability(data.startDate, data.endDate);
    return {
      configured: true as const,
      timezone: GHL_TIMEZONE,
      businessHours: { open: "08:00", close: "17:00" },
      days,
    };
  });

export const bookGhlAppointment = createServerFn({ method: "POST" })
  .validator(bookingSchema)
  .handler(async ({ data }) => {
    if (!requireToken()) return { configured: false as const };

    const selectedTime = new Date(data.startTime).getTime();
    if (Number.isNaN(selectedTime) || !isBusinessHourSlot(data.startTime)) {
      return {
        configured: true as const,
        success: false as const,
        reason: "hours" as const,
      };
    }

    // Re-check HighLevel immediately before creating anything. The custom UI is
    // only allowed to book a slot HighLevel itself still reports as free.
    try {
      const liveAvailability = await fetchAvailability(
        selectedTime - 12 * 60 * 60 * 1000,
        selectedTime + 12 * 60 * 60 * 1000,
      );

      if (!hasSlot(liveAvailability, data.startTime)) {
        return {
          configured: true as const,
          success: false as const,
          reason: "slot" as const,
        };
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Availability validation failed";
      console.error("GHL booking availability validation failed:", message);
      return {
        configured: true as const,
        success: false as const,
        reason: safeFailureReason(message),
      };
    }

    let contactId = "";
    try {
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
            phone: normalizePhone(data.phone),
            locationId: GHL_LOCATION_ID,
            source: "Website calendar",
          }),
        },
        "v3",
      );

      contactId = contactResponse.contact?.id || "";
      if (!contactId) throw new Error("HighLevel did not return a contact ID.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Contact upsert failed";
      console.error("GHL calendar contact upsert failed:", message);
      return {
        configured: true as const,
        success: false as const,
        reason: safeFailureReason(message),
      };
    }

    try {
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
        success: true as const,
        appointmentId: appointment.id || "",
        startTime: appointment.startTime || data.startTime,
        status: appointment.appointmentStatus || "confirmed",
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Appointment creation failed";
      console.error("GHL appointment creation failed:", message);
      return {
        configured: true as const,
        success: false as const,
        reason: safeFailureReason(message),
      };
    }
  });
