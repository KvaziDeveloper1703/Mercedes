import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
  website: z.string().optional(),
});

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const data = contactSchema.parse(body);

          // Honeypot: bots usually fill this hidden field; humans never see it.
          if (data.website && data.website.length > 0) {
            return Response.json({ success: true });
          }

          // TODO: after the email domain is configured, replace this log with
          // sendTemplateEmail('contact-form', RECIPIENT_EMAIL, { templateData: { ... } }).
          console.log("[contact-form] submission", {
            name: data.name,
            email: data.email,
            messageLength: data.message.length,
          });

          return Response.json({ success: true });
        } catch (error) {
          if (error instanceof z.ZodError) {
            return Response.json(
              { success: false, error: "Invalid input", details: error.errors },
              { status: 400 },
            );
          }
          console.error("[contact-form] error:", error);
          return Response.json(
            { success: false, error: "Failed to send message" },
            { status: 500 },
          );
        }
      },
    },
  },
});
