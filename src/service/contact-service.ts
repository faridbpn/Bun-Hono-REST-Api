import { prismaClients } from "../application/database";
import { Contact, User } from "../generated/prisma";
import {
  ContactResponse,
  CreateContactRequest,
  SearchContactRequest,
  UpdateContactRequest,
  toContactResponse,
} from "../model/contact-model";
import { Pageable } from "../model/page-model";
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
    ContactValidation.GET.parse(contactId);
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
    ContactValidation.DELETE.parse(contactId);
    await this.contactMustExist(user, contactId);

    await prismaClients.contact.delete({
      where: {
        username: user.username,
        id: contactId
      }
    });

    return true;
  }


  static async search(user: User, request: SearchContactRequest): Promise<Pageable<ContactResponse>> {
    request = ContactValidation.SEARCH.parse(request) as SearchContactRequest

    const filters = [];
    if(request.name){
      filters.push({
        OR: [
          {
            first_name: {
              contains: request.name
            }
          },
          {
            last_name: {
              contains: request.name
            }
          },
        ]
      })
    }
    
    if(request.email){
      filters.push({
        email: {
          contains: request.email
        }
      })
    }

    if(request.phone){
      filters.push({
        phone: {
          contains: request.phone
        }
      })
    }

    const skip = (request.page - 1) * request.size

    const contacts = await prismaClients.contact.findMany({
      where: {
        username: user.username,
        AND: filters
      },
      take: request.size,
      skip: skip
    })

    const total = await prismaClients.contact.count({
      where: {
        username: user.username,
        AND: filters
      }
    })

    return {
      data: contacts.map(contacts => toContactResponse(contacts)),
      paging: {
        current_page: request.page,
        size: request.size,
        total_page: Math.ceil(total / request.size)
      }
    }
  }
}
