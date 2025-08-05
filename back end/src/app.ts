import fastify from "fastify";
import cookie from "@fastify/cookie"
import cors from '@fastify/cors';

import mealsRoutes from "./routes/meals";
import { dashBoardRoutes } from "./routes/dashboard";
import { usersRoutes } from "./routes/users";

export const app = fastify()


await app.register(cors, {
  origin: ['http://localhost:5173', 'https://daily-diet-five.vercel.app'],
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
