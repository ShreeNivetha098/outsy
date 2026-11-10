const request = require("supertest");
const jwt = require("jsonwebtoken");

process.env.JWT_SECRET = "test-secret";
const app = require("../app");

describe("app", () => {
  it("responds on the health check", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toMatch(/Outsy API Running/);
  });

  it("returns JSON 404 for unknown routes", async () => {
    const res = await request(app).get("/api/nope");
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/Route not found/);
  });
});

describe("auth", () => {
  it("rejects register with missing fields", async () => {
    const res = await request(app).post("/api/auth/register").send({ email: "a@b.com" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("All fields are required");
  });

  it("rejects login with missing fields", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    expect(res.status).toBe(400);
  });
});

describe("protect middleware", () => {
  it("rejects requests without a Bearer token", async () => {
    const res = await request(app).get("/api/plans");
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Not authorized, no token");
  });

  it("rejects a token without the Bearer prefix", async () => {
    const token = jwt.sign({ id: "x" }, process.env.JWT_SECRET);
    const res = await request(app).get("/api/plans").set("Authorization", token);
    expect(res.status).toBe(401);
  });

  it("rejects a token signed with the wrong secret", async () => {
    const token = jwt.sign({ id: "x" }, "wrong-secret");
    const res = await request(app)
      .get("/api/plans")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Not authorized, token failed");
  });
});
