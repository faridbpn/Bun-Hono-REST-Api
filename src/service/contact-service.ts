import { prismaClients } from "../application/database";
import { User } from "../generated/prisma";
import {
  ContactResponse,
  CreateContactRequest,
  toContactResponse,
} from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { HTTPException } from "hono/http-exception";

export class ContactService {
  static async create(
    user: User,
    request: CreateContactRequest
  ): Promise<ContactResponse> {
    const validatedRequest = ContactValidation.CREATE.parse(
      request
    ) as CreateContactRequest;

    let data = {
      ...validatedRequest,
      ...{ username: user.username },
    };

    const contact = await prismaClients.contact.create({
      data: data,
    });

    return toContactResponse(contact);
  }

  static async get(user: User, contactId: number): Promise<ContactResponse> {
    const validatedContactId = ContactValidation.GET.parse(contactId) as number;

    const contact = await prismaClients.contact.findFirst({
      where: {
        id: validatedContactId,
        username: user.username,
      },
    });

    if (!contact) {
      throw new HTTPException(404, {
        message: "Contact is not found",
      });
    }

    return toContactResponse(contact);
  }
}
