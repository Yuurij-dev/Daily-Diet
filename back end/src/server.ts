import fastify from "fastify";
import { env } from "./env";
import { usersRoutes } from "./routes/users";
import cors from '@fastify/cors';

const app = fastify()


await app.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

app.register(usersRoutes,{
    prefix: 'users'
})

app.listen({
    port: env.PORT,
}).then(() => {
    console.log("HTTP Server Running!")
})