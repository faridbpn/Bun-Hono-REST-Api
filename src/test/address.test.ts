import { expect, describe, it, beforeEach, afterEach } from "bun:test";
import { AddressTest, ContactTest, UserTest } from "./test-utils";
import app from "..";

describe("POST /api/contacts/{id}/addresses", () => {
  beforeEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();

    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
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

describe("GET /api/contacts/{ContactId}/addresses/{addressId}", () => {
  beforeEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();

    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should rejected if address not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses/" + (address.id + 1),
      {
        method: "get",
        headers: {
          Authorization: "test",
        },
      }
    );

    expect(response.status).toBe(404);

    const body = await response.json();
    expect(body.errors).toBeDefined();
  });

  it("should success fi address exist", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses/" + address.id,
      {
        method: "get",
        headers: {
          Authorization: "test",
        },
      }
    );

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.id).toBeDefined();
    expect(body.data.street).toBe(address.street);
    expect(body.data.city).toBe(address.city);
    expect(body.data.province).toBe(address.province);
    expect(body.data.country).toBe(address.country);
    expect(body.data.postal_code).toBe(address.postal_code);
  });
});

describe("PUT /api/contacts/{contactId}/addresses/{addressId}", () => {
  beforeEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();

    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should rejected if request is invalid", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses/" + (address.id + 1),
      {
        method: "put",
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

  it("should rejected if address is not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses/" + (address.id + 1),
      {
        method: "put",
        headers: {
          Authorization: "test",
        },
        body: JSON.stringify({
          country: "indonesia",
          postal_code: "12345",
        }),
      }
    );

    expect(response.status).toBe(404);

    const body = await response.json();
    expect(body.errors).toBeDefined();
  });

  it("should success if request valid", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses/" + address.id,
      {
        method: "put",
        headers: {
          Authorization: "test",
        },
        body: JSON.stringify({
          street: "jalan",
          city: "kota",
          province: "provinsi",
          country: "malaysia",
          postal_code: "9999",
        }),
      }
    );

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.id).toBeDefined();
    expect(body.data.street).toBe("jalan");
    expect(body.data.city).toBe("kota");
    expect(body.data.province).toBe("provinsi");
    expect(body.data.country).toBe("malaysia");
    expect(body.data.postal_code).toBe("9999");
  });
});

describe("GET /api/contacts/{contactId}/addresses", () => {
  beforeEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();

    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should rejected if contact id is not found", async () => {
    const contact = await ContactTest.get();
    const response = await app.request(
      "/api/contacts/" + (contact.id + 1) + "/addresses",
      {
        method: "get",
        headers: {
          Authorization: "test",
        },
      }
    );

    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body.errors).toBeDefined();
  });

  it("should success if contact exists", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses",
      {
        method: "get",
        headers: {
          Authorization: "test",
        },
      }
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.length).toBe(1);
    expect(body.data[0].id).toBe(address.id);
    expect(body.data[0].street).toBe(address.street);
    expect(body.data[0].city).toBe(address.city);
    expect(body.data[0].province).toBe(address.province);
    expect(body.data[0].country).toBe(address.country);
    expect(body.data[0].postal_code).toBe(address.postal_code);
  });
});

describe("DELETE /api/contacts/{contactId}/addresses/{addressId}", () => {
  beforeEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();

    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should rejected if address not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses/" + (address.id + 1),
      {
        method: "delete",
        headers: {
          Authorization: "test",
        },
      }
    );

    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body.errors).toBeDefined();
  });

  it("should success if address exists", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses/" + address.id,
      {
        method: "delete",
        headers: {
          Authorization: "test",
        },
      }
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.data).toBeDefined();
  });
});
