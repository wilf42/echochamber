// src/test-db.ts
import { initializeDatabase } from './database';
import { AppDataSource } from './database/data-source';

const testConnection = async () => {
  console.log('Attempting to initialize database connection...');
  await initializeDatabase();
  console.log('Test script finished. Closing connection...');
  // Cleanly close the connection so the script can exit
  await AppDataSource.destroy();
  console.log('Connection closed.');
};

testConnection().catch((error) => {
  console.error('Test script failed:', error);
  process.exit(1);
});
