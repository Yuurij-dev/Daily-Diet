import { FastifyInstance } from "fastify"
import { db } from "../database"
import z from "zod"
import { randomUUID } from "crypto"

export async function usersRoutes(app: FastifyInstance) {

    app.get('/', async () => {
        const users = db('users').select('*')
        
        return users
    })

    app.post('/', async (request, reply) => {
        const createUserSchema = z.object({
            name: z.string(),
        })

        const {name} = createUserSchema.parse(request.body)

        await db('users').insert({
            id: randomUUID(),
            name,
        })
        return reply.status(201).send();
    })

}