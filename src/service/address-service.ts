import { prismaClients } from "../application/database";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, toAddressResponse } from "../model/address-model";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { User } from "../generated/prisma";
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

        const address = await prismaClients.address.findFirst({
            where: {
                contact_id: request.contact_id,
                id: request.id
            }
        })

        if(!address) {
            throw new HTTPException(404, {
                message: "Address id not found"
            })
        }

        return toAddressResponse(address)
    }
}