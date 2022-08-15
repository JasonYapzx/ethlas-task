import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async(req, res) => {
    const id = JSON.parse(req.body);

    console.log(id);

    const updatePerson = await prisma.person.update({
        where: {
            id: id
        }, 
        data: {
            count: + 1
        }
    })

    res.json(updatePerson)
}