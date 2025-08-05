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

        const user = {
            id: randomUUID(),
            name,
        }
        await db('users').insert(user)

        return reply.status(201).send(user);
    })

   app.delete('/:id', async (req, res) => {
    const {id} = req.params as {id: string}

    try{
        await db('users').where('id', id).del()
        res.status(200).send({message: "Usuário deletado com sucesso"})
    } catch (error){
        res.status(500).send({error: "Erro ao deletar usuário."})
    }
   })

   app.post('/login/:id', async (req, reply) => {
    const {id} = req.params as {id: string}

    reply.setCookie('user_id', id, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
    }).send({message: "Login succeeded"})
    })

    app.get('/me', async(req, reply) => {
        const userId = req.cookies.user_id

        if(!userId) return reply.status(401).send({message: "Not logged."})

        const user = await db('users').where('id', userId).first()

        if(!user) {
            return reply.status(401).send({message: "User invalid."})
        }

        return reply.send({user})
    })

    app.post('/logout', async (req, reply) => {
        reply.clearCookie('user_id', {path: '/'})
        return reply.send({message: "Deslogado com sucesso"})
    })
    
}