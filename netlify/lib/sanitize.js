const HTML_ESCAPES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
};

export const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
export const singleLine = (value) => String(value ?? "").replace(/[\r\n]+/g, " ").trim();
export const LIMITS = {
    name: 100,
    email: 200,
    subject: 200,
    message: 5000,
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
