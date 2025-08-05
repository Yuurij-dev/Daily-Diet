import { FastifyInstance } from "fastify"
import z from 'zod'
import { db } from "../database"
import { randomUUID } from "crypto"
import { accessSync } from "fs"

export default function mealsRoutes(app: FastifyInstance) {

    app.post('/', async(req, reply) => {
        const createMealSchema = z.object({
            name: z.string(),
            description: z.string(),
            date_time: z.string(),
            is_on_diet: z.boolean(),
        })

        const {name, description, date_time, is_on_diet} = createMealSchema.parse(req.body)

        const user_id = req.cookies.user_id
        if(!user_id){
            return reply.status(401).send({message: "Unauthorized: user_id cookie not found"})
        }

        const parsedDate = new Date(date_time)
        if(isNaN(parsedDate.getTime())){
            return reply.status(400).send({message: "Invalid date_time format"})
        }

        const meal = {
            id: randomUUID(),
            user_id,
            name,
            description,
            date_time: parsedDate,
            is_on_diet,
        }
        await db('meals').insert(meal)

        return reply.status(201).send(meal)
    })

    app.get('/', async (req, reply) => {
        const userId = req.cookies.user_id

        if(!userId){
            return reply.send(401).send({message: 'Unauthorized: user_id cookie missing'})
        }

        try{
            const meals = await db('meals').select('*').where('user_id', userId)
            return reply.send(meals)
        }catch(err) {
            console.error("Erro ao buscar refeições", err)
        }return reply.status(500).send({message: 'Internal server error'})

    })

    app.get('/:id', async(req, reply) => {
        const {id} = req.params as {id: string}

        try{
            const meal = await db('meals').select('*').where('id', id).first()
            if(!meal){
                return reply.status(404).send({message: "Refeição não encontrada"})
            }

            return reply.send(meal)
        }catch(err) {
            console.error("Erro ao buscar refeição", err)
            return reply.status(500).send({message: "Erro interno do servidor"})
        }
    })

    app.delete('/:id', async(req, reply) => {
        const {id} = req.params as {id: string}

        try{
            const mealRemove = await db('meals').where('id', id).del()
            if(!mealRemove){
                return reply.status(404).send({message: "Refeição exluida com sucesso"})
            }
            return reply.status(204).send(mealRemove)
        } catch (error){
            reply.status(500).send({error: "Erro ao deletar refeição."})
        }
    })

    app.put('/:id', async(req, reply) => {
        const {id} = req.params as {id: string}
        const updateData = req.body

        try{
            const mealEdit = await db('meals').where('id', id).update(updateData)

            if(updateData === 0){
                return reply.status(404).send({message: "Refeilão não encontrada"})
            }
        }catch(err) {
            console.error(err)
            return reply.status(500).send({message: 'Erro ao atualizar refeição.'})
        }
    })
}