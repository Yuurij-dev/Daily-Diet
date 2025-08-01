import knex, {Knex} from "knex";
import { env } from "./env";

export const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: env.DATABASE_URL,
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations',
    }
}

export const db = knex(config)
db.raw('PRAGMA foreign_keys = ON').catch(console.error)