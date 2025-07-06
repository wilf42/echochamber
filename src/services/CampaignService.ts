// src/services/CampaignService.ts
import {
  CampaignRepository,
  CreateCampaignDto,
} from '../database/repositories/CampaignRepository';
import { Campaign } from '../database/entities/Campaign';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ServiceError } from '../errors/ServiceError';
import logger from '../lib/logger'; // Import our new logger

export class CampaignService {
  private readonly campaignRepository: CampaignRepository;

  constructor(campaignRepository: CampaignRepository) {
    this.campaignRepository = campaignRepository;
  }

  public async create(campaignData: CreateCampaignDto): Promise<Campaign> {
    const campaignDto = plainToInstance(CreateCampaignDto, campaignData);

    const errors = await validate(campaignDto);
    if (errors.length > 0) {
      const messages = errors
        .map((err) => Object.values(err.constraints!))
        .flat();
      const errorMessage = `Validation failed: ${messages.join(', ')}`;

      // Log validation failures with a 'warn' level
      logger.warn({ validationErrors: messages }, errorMessage);
      throw new ServiceError(errorMessage);
    }

    try {
      const newCampaign = await this.campaignRepository.create(campaignDto);

      // Log successful creations with an 'info' level
      logger.info(
        { campaignId: newCampaign.id },
        'Successfully created campaign'
      );
      return newCampaign;
    } catch (error) {
      // Log repository failures with an 'error' level, passing the original
      // error object for full context in the logs.
      logger.error(
        { err: error, campaignName: campaignDto.name },
        'Repository failed to create campaign'
      );

      // We still throw a generic error to the client to avoid leaking details.
      throw new ServiceError(
        'Failed to create campaign due to a data storage issue.'
      );
    }
  }
}
