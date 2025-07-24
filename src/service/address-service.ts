import { prismaClients } from "../application/database";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, UpdateAddressRequest, toAddressResponse } from "../model/address-model";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { Address, User } from "../generated/prisma";
import { HTTPException } from "hono/http-exception";

export class AddressService {

    static async create(user: User, request: CreateAddressRequest) : Promise<AddressResponse> {
        request = AddressValidation.CREATE.parse(request) as CreateAddressRequest
        await ContactService.contactMustExist(user, request.contact_id)

        const address = await prismaClients.address.create({
            data: request
        })

        return toAddressResponse(address)
    }

    static async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
        request = AddressValidation.GET.parse(request) as GetAddressRequest
        await ContactService.contactMustExist(user, request.contact_id)
        const address = await this.addressMustExist(request.contact_id,  request.id)

        return toAddressResponse(address)
    }

    static async addressMustExist(contactId: number, addressId: number): Promise<Address> {
        const address = await prismaClients.address.findFirst({
            where: {
                contact_id: contactId,
                id: addressId
            }
        })

        if(!address) {
            throw new HTTPException(404, {
                message: "Address id not found"
            })
        }
        return address
    }

    static async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
        request = AddressValidation.UPDATE.parse(request) as UpdateAddressRequest
        await ContactService.contactMustExist(user, request.contact_id)
        await this.addressMustExist(request.contact_id, request.id)

        const address = await prismaClients.address.update({
            where: {
                id: request.id,
                contact_id: request.contact_id
            },
            data: request
        })

        return toAddressResponse(address)
    }
}