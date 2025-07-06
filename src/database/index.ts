// src/database/index.ts
import { AppDataSource } from './data-source';

export const initializeDatabase = async () => {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log('Database connection has been initialized successfully.');
        }
    } catch (error) {
        console.error('Error during database initialization:', error);
        throw error; // Rethrow the error to be handled by the application's main process
    }
};
