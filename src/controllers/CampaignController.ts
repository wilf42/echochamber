// src/controllers/CampaignController.ts
import { Request, Response, NextFunction } from 'express';
import { CampaignService } from '../services/CampaignService';
import { CreateCampaignDto } from '../database/repositories/CampaignRepository';

export class CampaignController {
  private campaignService: CampaignService;

  constructor(campaignService: CampaignService) {
    this.campaignService = campaignService;
  }

  /**
   * Handles the HTTP request to create a new campaign.
   * It passes any errors to the centralized error handling middleware.
   */
  public create = async (
    req: Request,
    res: Response,
    next: NextFunction // The 'next' function is used to pass control to the next middleware
  ): Promise<void> => {
    try {
      const campaignData: CreateCampaignDto = req.body;
      const newCampaign = await this.campaignService.create(campaignData);
      res.status(201).json(newCampaign);
    } catch (error) {
      // Pass the error to the next middleware in the chain (our errorHandler)
      next(error);
    }
  };
}
