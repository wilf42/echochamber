// src/database/repositories/CampaignRepository.ts
import { Repository } from 'typeorm';
import { Campaign } from '../entities/Campaign';
// The 'validate' import is no longer needed here.
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * A Data Transfer Object (DTO) for creating a campaign.
 * The validation rules are still defined here, but they are enforced by the Service.
 */
export class CreateCampaignDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Campaign name cannot be empty.' })
  @MaxLength(255, {
    message: 'Campaign name cannot be longer than 255 characters.',
  })
  name!: string;

  @IsString()
  description!: string;
}

export class CampaignRepository {
  private readonly typeormRepo: Repository<Campaign>;

  constructor(campaignRepository: Repository<Campaign>) {
    this.typeormRepo = campaignRepository;
  }

  /**
   * Creates a new campaign record in the database.
   * Assumes the input data has already been validated by the service layer.
   * @param campaignData - The data for the new campaign.
   * @returns The newly created and saved Campaign entity.
   */
  public async create(campaignData: CreateCampaignDto): Promise<Campaign> {
    // The validation logic has been removed. We now trust the service.
    const newCampaign = this.typeormRepo.create(campaignData);
    await this.typeormRepo.save(newCampaign);
    return newCampaign;
  }
}
