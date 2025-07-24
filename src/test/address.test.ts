import { expect, describe, it, beforeEach, afterEach } from "bun:test";
import { ContactTest, UserTest } from "./test-utils";
import app from "..";

describe("POST /api/contacts/{id}/addresses", () => {
  beforeEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should reject if request not invalid", async () => {
    const contact = await ContactTest.get();
    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses",
      {
        method: "post",
        headers: {
          Authorization: "test",
        },
        body: JSON.stringify({
          country: "",
          postal_code: "",
        }),
      }
    );

    expect(response.status).toBe(400);

    const body = await response.json();
    expect(body.errors).toBeDefined();
  });

  it("should reject if address not found", async () => {
    const contact = await ContactTest.get();
    const response = await app.request(
      "/api/contacts/" + (contact.id + 1) + "/addresses",
      {
        method: "post",
        headers: {
          Authorization: "test",
        },
        body: JSON.stringify({
          country: "indonesia",
          postal_code: "12131",
        }),
      }
    );

    expect(response.status).toBe(404);

    const body = await response.json();
    expect(body.errors).toBeDefined();
  });

  it("should success if contact is valid (full data)", async () => {
    const contact = await ContactTest.get();
    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses",
      {
        method: "post",
        headers: {
          Authorization: "test",
        },
        body: JSON.stringify({
          country: "indonesia",
          postal_code: "12345",
          street: "jalan",
          city: "kota",
          province: "provinsi",
        }),
      }
    );

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.id).toBeDefined();
    expect(body.data.country).toBe("indonesia");
    expect(body.data.postal_code).toBe("12345");
    expect(body.data.street).toBe("jalan");
    expect(body.data.city).toBe("kota");
    expect(body.data.province).toBe("provinsi");
  });
});
