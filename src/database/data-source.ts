// src/database/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Campaign } from './entities/Campaign';
import path from 'path';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    // In a real Electron app, this path should be moved to a user-specific
    // directory using app.getPath('userData') to ensure it's not overwritten.
    // For now, we'll place it in the project root for simplicity.
    database: path.resolve(__dirname, '..', '..', 'echochamber.db'),

    // 'synchronize: true' is great for development. It automatically creates
    // your database schema based on your entities. For production, you'll
    // want to turn this off and use migrations instead.
    synchronize: true,

    logging: true, // Set to 'true' to see SQL queries in the console.
    entities: [Campaign],
    migrations: [],
    subscribers: [],
});
