import request from "supertest";
import app from "../app.js";
import { connectTestDB, closeTestDB } from "./setup.js";

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

test("User can signup", async () => {
  const res = await request(app).post("/api/auth/signup").send({
    fullName: "Test User",
    email: "test@test.com",
    password: "password123",
  });

  expect(res.statusCode).toBe(201);
});
