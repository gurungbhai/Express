// src/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST || "localhost",
    port: Number(DB_PORT) || 5432,
    username: DB_USERNAME || "postgres",
    password: DB_PASSWORD || "password",
    database: DB_DATABASE || "postgres",
    synchronize: false,
    logging: false,
    entities: ["src/entity/*.ts"],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
});
