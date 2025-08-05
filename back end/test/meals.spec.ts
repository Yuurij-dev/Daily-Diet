import request from 'supertest'
import {app} from '../src/app'
import { execSync } from 'child_process'

import { afterAll, beforeAll, it, describe, expect, beforeEach } from 'vitest'

describe("Meals Routes", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(async () => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    }, 100_000)

    it('should be able to create a user', async () => {
        const response = await request(app.server)
            .post('/users')
            .send({
                name: 'User Test'
            })
            .expect(201)

        expect(response.body).toHaveProperty('id')
        expect(response.body.name).toBe('User Test')
    })

    it('should set a user_id cookie on login', async () => {

        const createUserResponse = await request(app.server)
            .post('/users')
            .send({
                name: 'User Test'
            })
            .expect(201)

        const userId = createUserResponse.body.id

        const response = await request(app.server)
            .post(`/users/login/${userId}`)
            .expect(200)

        const cookies = response.get('Set-Cookie')

        expect(cookies).toEqual(
            expect.arrayContaining([
                expect.stringContaining(`user_id=${userId}`)
            ])
        )

        expect(response.body).toEqual({
            message: 'Login succeeded'
        })
    })

    it('should be able to create meal', async () => {
        const createUserResponse = await request(app.server)
            .post('/users')
            .send({
                name: 'User Test'
            })
            .expect(201)

        const userId = createUserResponse.body.id

        const makeLoginResponse = await request(app.server)
            .post(`/users/login/${userId}`)
            .expect(200)

        const cookies = makeLoginResponse.get('Set-Cookie')

        expect(cookies).toEqual(
            expect.arrayContaining([
                expect.stringContaining(`user_id=${userId}`)
            ])
        )

        expect(makeLoginResponse.body).toEqual({
            message: 'Login succeeded'
        })

        await request(app.server)
            .post(`/meals`)
            .set('Cookie', cookies!)
            .send({
                user_id: userId,
                name: "Meal Created",
                description: "descrition meal",
                date_time: "2025-08-04T20:00:00Z",
                is_on_diet: true
            })
            .expect(201)
    })

    it('should be able to delete a meal', async () => {
        const createUserResponse = await request(app.server)
            .post('/users')
            .send({
                name: 'User Test'
            })
            .expect(201)

        const userId = createUserResponse.body.id

        const makeLoginResponse = await request(app.server)
            .post(`/users/login/${userId}`)
            .expect(200)

        const cookies = makeLoginResponse.get('Set-Cookie')

        expect(cookies).toEqual(
            expect.arrayContaining([
                expect.stringContaining(`user_id=${userId}`)
            ])
        )

        expect(makeLoginResponse.body).toEqual({
            message: 'Login succeeded'
        })

        const createMealResponse = await request(app.server)
            .post(`/meals`)
            .set('Cookie', cookies!)
            .send({
                user_id: userId,
                name: "Meal Created",
                description: "descrition meal",
                date_time: "2025-08-04T20:00:00Z",
                is_on_diet: true
            })
            .expect(201)

        await request(app.server)
            .delete(`/meals/${createMealResponse.body.id}`)
            .set('Cookie', cookies!)
            .expect(204)
    })

})