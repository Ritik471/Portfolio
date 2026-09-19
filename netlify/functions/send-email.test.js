import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const send = vi.fn(async () => ({ data: { id: "eml_1" }, error: null }));
vi.mock("resend", () => ({
  Resend: class {
    constructor() {
      this.emails = { send };
    }
  },
}));

const { handler } = await import("./send-email.js");

const post = (body, ip = `1.2.3.${Math.floor(Math.random() * 1e6)}`) => ({
  httpMethod: "POST",
  headers: { "x-nf-client-connection-ip": ip },
  body: JSON.stringify(body),
});

const valid = {
  name: "Ritik",
  email: "someone@example.com",
  subject: "Hello",
  message: "Hi there",
};

beforeEach(() => {
  process.env.RESEND_API_KEY = "re_test";
  send.mockClear();
});

afterEach(() => vi.restoreAllMocks());

describe("send-email", () => {
  it("rejects non-POST requests", async () => {
    const res = await handler({ httpMethod: "GET", headers: {} }, {});
    expect(res.statusCode).toBe(405);
  });

  it("sends a valid submission", async () => {
    const res = await handler(post(valid), {});
    expect(res.statusCode).toBe(200);
    expect(send).toHaveBeenCalledOnce();
  });

  it("sets replyTo so the message can be answered directly", async () => {
    await handler(post(valid), {});
    expect(send.mock.calls[0][0].replyTo).toBe("someone@example.com");
  });

  it("escapes injected markup instead of embedding it in the email", async () => {
    await handler(
      post({ ...valid, message: '<a href="http://evil.test">win a prize</a>' }),
      {},
    );
    const { html } = send.mock.calls[0][0];
    expect(html).not.toContain('<a href="http://evil.test"');
    expect(html).toContain("&lt;a href=&quot;http://evil.test&quot;&gt;");
  });

  it("does not let the subject inject email headers", async () => {
    await handler(post({ ...valid, subject: "hi\r\nBcc: victim@evil.test" }), {});
    expect(send.mock.calls[0][0].subject).not.toMatch(/[\r\n]/);
  });

  it("rejects invalid payloads before calling Resend", async () => {
    const res = await handler(post({ ...valid, email: "nope" }), {});
    expect(res.statusCode).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    const res = await handler(
      { httpMethod: "POST", headers: {}, body: "{not json" },
      {},
    );
    expect(res.statusCode).toBe(400);
  });

  it("throttles repeated submissions from one client", async () => {
    const ip = "9.9.9.9";
    const codes = [];
    for (let i = 0; i < 5; i += 1) {
      codes.push((await handler(post(valid, ip), {})).statusCode);
    }
    expect(codes.filter((c) => c === 200)).toHaveLength(3);
    expect(codes.filter((c) => c === 429)).toHaveLength(2);
  });

  it("reports missing configuration", async () => {
    delete process.env.RESEND_API_KEY;
    const res = await handler(post(valid), {});
    expect(res.statusCode).toBe(500);
  });
});
