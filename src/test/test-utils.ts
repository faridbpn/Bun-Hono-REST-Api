import { prismaClients } from "../application/database";

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

}
