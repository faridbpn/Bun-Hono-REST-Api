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
        await prismaClients.user.deleteMany({
            where: {
                username: "test"
            }
        })
    }
}
