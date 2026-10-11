import { createFileRoute } from "@tanstack/react-router";

type ReviewPayload = { rating?: number; comment?: string; name?: string; email?: string; photo?: { name: string; type: string; data: string } | null };
const validEmail = (value: string) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const Route = createFileRoute("/api/review")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const webhook = process.env.GHL_REVIEW_WEBHOOK_URL;
        if (!webhook) return Response.json({ error: "Feedback service is not configured yet." }, { status: 503 });
        let data: ReviewPayload;
        try { data = (await request.json()) as ReviewPayload; }
        catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
        const rating = Number(data.rating);
        const comment = typeof data.comment === "string" ? data.comment.trim() : "";
        const name = typeof data.name === "string" ? data.name.trim() : "";
        const email = typeof data.email === "string" ? data.email.trim() : "";
        if (!Number.isInteger(rating) || rating < 1 || rating > 5 || comment.length > 5000 || name.length > 120 || email.length > 254 || !validEmail(email) || !comment || (!name && !email)) {
          return Response.json({ error: "Please provide a rating, feedback and valid contact details." }, { status: 400 });
        }
        const photo = data.photo;
        if (photo && (typeof photo.name !== "string" || typeof photo.type !== "string" || !/^image\/(jpeg|png|webp)$/i.test(photo.type) || typeof photo.data !== "string" || photo.data.length > 3000000)) {
          return Response.json({ error: "Use a JPEG, PNG or WebP photo under 2 MB." }, { status: 400 });
        }
        try {
          const response = await fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              source: "website-review",
              business: "Buena Park Injury Lawyer",
              rating,
              feedback: comment,
              review: comment,
              review_rating: rating,
              review_feedback: comment,
              review_attachment: photo ?? null,
              name,
              email,
              photo: photo ?? null,
              needsFollowUp: rating <= 3,
              submittedAt: new Date().toISOString(),
            }),
            signal: AbortSignal.timeout(10000),
          });
          if (!response.ok) throw new Error("Webhook rejected request");
          return Response.json({ ok: true });
        } catch {
          return Response.json({ error: "Could not save feedback. Please try again." }, { status: 502 });
        }
      },
    },
  },
});
