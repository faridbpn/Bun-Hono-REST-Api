import { prismaClients } from "../application/database";
import { contactController } from "../controller/contact-controller";
import { Contact, User } from "../generated/prisma";
import {
  ContactResponse,
  CreateContactRequest,
  UpdateContactRequest,
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
    const contact = this.contactMustExist(user, contactId);
    return toContactResponse(await contact);
  }

  static async contactMustExist(
    user: User,
    contactId: number
  ): Promise<Contact> {
    const contact = await prismaClients.contact.findFirst({
      where: {
        id: contactId,
        username: user.username,
      },
    });

    if (!contact) {
      throw new HTTPException(404, {
        message: "Contact is not found",
      });
    }

    return contact;
  }

  static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse> {
    request = ContactValidation.UPDATE.parse(request) as UpdateContactRequest;
    await this.contactMustExist(user, request.id)

    const contact = await prismaClients.contact.update({
      where:  {
        username: user.username,
        id: request.id
      },
      data: request
    })

    return toContactResponse(contact)
  }
 

  static async delete(user: User, contactId: number): Promise<boolean> {
    const validatedContactId = ContactValidation.DELETE.parse(contactId) as number;
    await this.contactMustExist(user, validatedContactId);

    await prismaClients.contact.delete({
      where: {
        username: user.username,
        id: validatedContactId
      }
    });

    return true;
  }

}
