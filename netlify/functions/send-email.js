import { Resend } from 'resend';
import { escapeHtml, validateContact } from '../lib/sanitize.js';
import { rateLimit } from '../lib/rate-limit.js';

const JSON_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const respond = (statusCode, body, extraHeaders = {}) => ({
  statusCode,
  headers: { ...JSON_HEADERS, ...extraHeaders },
  body: JSON.stringify(body),
});

const clientIp = (event) =>
  event.headers?.["x-nf-client-connection-ip"] ||
  event.headers?.["client-ip"] ||
  (event.headers?.["x-forwarded-for"] || "").split(",")[0].trim() ||
  "unknown";

export const handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return respond(405, { error: "Method Not Allowed" });
  }

  // Open endpoint that sends mail on demand, so throttle per client.
  const limit = rateLimit(clientIp(event));
  if (!limit.allowed) {
    return respond(
      429,
      { error: "Too many messages. Please try again later." },
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  const { RESEND_API_KEY } = process.env;
  if (!RESEND_API_KEY) {
    return respond(500, { error: "Email is not configured" });
  }

  let parsed;
  try {
    parsed = JSON.parse(event.body || "{}");
  } catch {
    return respond(400, { error: "Invalid JSON body" });
  }

  const result = validateContact(parsed);
  if (!result.ok) {
    return respond(400, { error: result.error });
  }

  const { name, email, subject, message } = result.value;

  // Every interpolation below is escaped: raw values would let a sender inject
  // working markup into the email that lands in the inbox.
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject),
    message: escapeHtml(message),
  };

  const resend = new Resend(RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'ritikshah1206@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="background-color: #050505; color: #e5e7eb; font-family: 'Inter', system-ui, sans-serif; padding: 40px 20px; border-radius: 24px;">
          <div style="max-width: 600px; margin: 0 auto; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 32px; padding: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            <div style="margin-bottom: 32px;">
              <p style="font-family: monospace; color: #10b981; text-transform: uppercase; letter-spacing: 0.3em; font-size: 10px; margin-bottom: 12px;">// Incoming_Transmission</p>
              <h1 style="font-size: 32px; font-weight: 800; letter-spacing: -0.04em; margin: 0; color: #ffffff;">NEW <span style="color: #94a3b8; font-style: italic;">MESSAGE.</span></h1>
            </div>

            <div style="margin-bottom: 32px; padding: 24px; background: rgba(255, 255, 255, 0.02); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.05);">
              <div style="margin-bottom: 20px;">
                <p style="font-family: monospace; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; font-size: 9px; margin-bottom: 4px;">Source_Identity</p>
                <p style="font-size: 16px; font-weight: 600; margin: 0; color: #10b981;">${safe.name}</p>
                <p style="font-size: 14px; color: #94a3b8; margin: 2px 0 0 0;">${safe.email}</p>
              </div>

              <div>
                <p style="font-family: monospace; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; font-size: 9px; margin-bottom: 4px;">Subject_Line</p>
                <p style="font-size: 16px; font-weight: 500; margin: 0; color: #ffffff;">${safe.subject}</p>
              </div>
            </div>

            <div style="margin-bottom: 32px;">
              <p style="font-family: monospace; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; font-size: 9px; margin-bottom: 12px;">Message_Payload</p>
              <div style="font-size: 15px; line-height: 1.6; color: #cbd5e1; white-space: pre-wrap; background: rgba(0,0,0,0.2); padding: 24px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.03);">
                ${safe.message}
              </div>
            </div>

            <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); text-align: center;">
              <p style="font-family: monospace; color: #475569; font-size: 9px; text-transform: uppercase; letter-spacing: 0.4em; margin-top: 24px;">Nagpur, IN — Listening_on_Port:2026</p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      return respond(502, { error: error.message });
    }

    return respond(200, { message: "Email sent successfully", id: data?.id ?? null });
  } catch (error) {
    return respond(500, { error: error.message });
  }
};
