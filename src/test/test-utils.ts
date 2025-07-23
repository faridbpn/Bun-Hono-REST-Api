import { prismaClients } from "../application/database";
import { Contact } from "../generated/prisma";

export class UserTest {
    static async create(){
        await prismaClients.user.create({
            data: {
                username: "test",
                name: "test",
                password: await Bun.password.hash("test", {
                    algorithm: "bcrypt",
                    cost: 10
                }),
                token: "test"
            }
        })
    }

    static async createMany() {

    }

    static async delete(){
        // Delete contacts first to avoid foreign key constraint errors
        await prismaClients.contact.deleteMany({
            where: {
                username: "test"
            }
        });
        await prismaClients.user.deleteMany({
            where: {
                username: "test"
            }
        })
    }
}

export class ContactTest {

    static async deleteAll() {
        await prismaClients.contact.deleteMany({
            where: {
                username: 'test'
            }
        })
    }

    static async create() {
        await prismaClients.contact.create({
            data: {
                first_name: "farid",
                last_name: "bpn",
                email: "test@gmail.com",
                phone: "12345",
                username: "test"
            }
        })
    }

    static async createMany(n: number){
        for (let i = 0; i < n; i++) {
            await this.create()
        }
    }

    static async get(): Promise<Contact> {
        return await prismaClients.contact.findFirstOrThrow({
            where: {
                username: "test"
            }
        })
    }

}
