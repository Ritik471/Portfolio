import { describe, it, expect } from "vitest";
import { escapeHtml, singleLine, validateContact, LIMITS } from "./sanitize.js";

describe("escapeHtml", () => {
  it("neutralises markup a sender could inject into the email", () => {
    expect(escapeHtml('<a href="http://evil.test">click</a>')).toBe(
      "&lt;a href=&quot;http://evil.test&quot;&gt;click&lt;/a&gt;",
    );
  });

  it("escapes ampersands without double-escaping the output", () => {
    expect(escapeHtml("Tom & Jerry")).toBe("Tom &amp; Jerry");
    expect(escapeHtml("<")).toBe("&lt;");
  });

  it("handles null and undefined", () => {
    expect(escapeHtml(null)).toBe("");
    expect(escapeHtml(undefined)).toBe("");
  });
});

describe("singleLine", () => {
  it("strips newlines so headers cannot be injected", () => {
    expect(singleLine("subject\r\nBcc: victim@evil.test")).toBe(
      "subject Bcc: victim@evil.test",
    );
  });
});

describe("validateContact", () => {
  const valid = {
    name: "Ritik",
    email: "someone@example.com",
    subject: "Hello",
    message: "Hi there",
  };

  it("accepts a well-formed submission", () => {
    const result = validateContact(valid);
    expect(result.ok).toBe(true);
    expect(result.value.name).toBe("Ritik");
  });

  it.each(["name", "email", "subject", "message"])("rejects missing %s", (field) => {
    const result = validateContact({ ...valid, [field]: "" });
    expect(result.ok).toBe(false);
    expect(result.error).toContain(field);
  });

  it("rejects whitespace-only fields", () => {
    expect(validateContact({ ...valid, message: "   " }).ok).toBe(false);
  });

  it("rejects a malformed email", () => {
    expect(validateContact({ ...valid, email: "not-an-email" }).ok).toBe(false);
  });

  it("rejects oversized input", () => {
    const result = validateContact({ ...valid, message: "x".repeat(LIMITS.message + 1) });
    expect(result.ok).toBe(false);
    expect(result.error).toContain("message");
  });

  it("strips newlines from the subject but preserves them in the message", () => {
    const result = validateContact({
      ...valid,
      subject: "line1\nline2",
      message: "para1\n\npara2",
    });
    expect(result.value.subject).toBe("line1 line2");
    expect(result.value.message).toBe("para1\n\npara2");
  });

  it("rejects non-string field types", () => {
    expect(validateContact({ ...valid, name: { toString: () => "x" } }).ok).toBe(false);
  });
});
