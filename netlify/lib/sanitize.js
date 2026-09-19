const HTML_ESCAPES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
};

/**
 * Escape untrusted text before interpolating it into an HTML email body.
 * Without this, a sender can inject working markup (links, styling, spoofed
 * content) into the message that lands in the inbox.
 */
export const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);

/** Strip CR/LF so user input cannot inject extra email headers. */
export const singleLine = (value) => String(value ?? "").replace(/[\r\n]+/g, " ").trim();

export const LIMITS = {
    name: 100,
    email: 200,
    subject: 200,
    message: 5000,
};

// Deliberately permissive: rejects obvious junk without attempting to be a
// full RFC 5322 implementation.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate a contact-form submission.
 * Returns { ok: true, value } or { ok: false, error }.
 */
export const validateContact = (body) => {
    const fields = ["name", "email", "subject", "message"];
    const value = {};

    for (const field of fields) {
        const raw = body?.[field];
        if (typeof raw !== "string" || raw.trim() === "") {
            return { ok: false, error: `Missing required field: ${field}` };
        }
        const trimmed = raw.trim();
        if (trimmed.length > LIMITS[field]) {
            return { ok: false, error: `${field} exceeds ${LIMITS[field]} characters` };
        }
        value[field] = field === "message" ? trimmed : singleLine(trimmed);
    }

    if (!EMAIL_RE.test(value.email)) {
        return { ok: false, error: "Invalid email address" };
    }

    return { ok: true, value };
};
