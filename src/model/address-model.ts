import { Address } from "../generated/prisma";

export type CreateAddressRequest = {
    contact_id: number;
    street?: string;
    city?: string;
    province?: string;
    country: string;
    postal_code: string;
}

export type AddressResponse = {
    id: number;
    street?: string | null;
    city?: string | null;
    province?: string | null;
    country: string;
    postal_code: string;
}

export type GetAddressRequest = {
    contact_id: number;
    id: number;
}

export type UpdateAddressRequest = {
    id: number
    contact_id: number;
    street?: string;
    city?: string;
    province?: string;
    country: string;
    postal_code: string;
}

export type RemoveAddressRequest = {
    contact_id: number;
    id: number;
}

export type ListAddressRequest = {
    contact_id: number;
}

export function toAddressResponse(address: Address): AddressResponse {
    return {
        id: address.id,
        street: address.street,
        city: address.city,
        province: address.province,
        country: address.country,
        postal_code: address.postal_code,
    }
}
