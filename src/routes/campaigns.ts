// src/routes/campaigns.ts
import { Router } from 'express';
import { CampaignController } from '../controllers/CampaignController';
import { CampaignService } from '../services/CampaignService';

/**
 * Creates and configures the router for campaign-related endpoints.
 * By accepting dependencies, this function becomes easily testable and reusable.
 * @param campaignService - The service responsible for campaign business logic.
 * @returns An Express Router instance.
 */
export function createCampaignsRouter(
  campaignService: CampaignService
): Router {
  const campaignController = new CampaignController(campaignService);
  const router = Router();

  // Define the route and link it to the controller method
  router.post('/', campaignController.create);

  return router;
}
