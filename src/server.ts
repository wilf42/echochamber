// src/server.ts
import express, { Express } from 'express';
import { createCampaignsRouter } from './routes/campaigns';
import { CampaignService } from './services/CampaignService';
import { CampaignRepository } from './database/repositories/CampaignRepository';
import { AppDataSource } from './database/data-source';
import { Campaign } from './database/entities/Campaign';
import { errorHandler } from './middleware/errorHandler';

export function setupServer(): Express {
  const app = express();

  app.use(express.json());

  // --- Dependency Injection ---
  const typeormCampaignRepo = AppDataSource.getRepository(Campaign);
  const campaignRepository = new CampaignRepository(typeormCampaignRepo);
  const campaignService = new CampaignService(campaignRepository);
  // --------------------------

  // Mount the router
  app.use('/api/campaigns', createCampaignsRouter(campaignService));

  // Register the error handler middleware.
  // It MUST be the last piece of middleware added.
  // By removing '@ts-ignore', we allow TypeScript to correctly validate this.
  app.use(errorHandler);

  return app;
}
