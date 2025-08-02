import fastify from "fastify";
import { env } from "./env";
import { usersRoutes } from "./routes/users";
import cors from '@fastify/cors';
import { dashBoardRoutes } from "./routes/dashboard";
import cookie from "@fastify/cookie"
import mealsRoutes from "./routes/meals";


const app = fastify()


await app.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

app.register(cookie)

app.register(usersRoutes,{
    prefix: 'users'
})

app.register(mealsRoutes, {
    prefix: 'meals',
})
app.register(dashBoardRoutes,{
    prefix: 'dashboard'
})

app.listen({
    port: env.PORT,
}).then(() => {
    console.log("HTTP Server Running!")
})