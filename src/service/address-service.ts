import { prismaClients } from "../application/database";
import { AddressResponse, CreateAddressRequest, toAddressResponse } from "../model/address-model";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { User } from "../generated/prisma";

export class AddressService {

    static async create(user: User, request: CreateAddressRequest) : Promise<AddressResponse> {
        request = AddressValidation.CREATE.parse(request) as CreateAddressRequest
        await ContactService.contactMustExist(user, request.contact_id)

        const address = await prismaClients.address.create({
            data: request
        })

        return toAddressResponse(address)
    }

}