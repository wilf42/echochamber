// src/database/repositories/CampaignRepository.ts
import { Repository } from 'typeorm';
import { Campaign } from '../entities/Campaign';
import { validate } from 'class-validator';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * A Data Transfer Object (DTO) for creating a campaign, now with validation rules.
 */
export class CreateCampaignDto {
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
   * Creates a new campaign record in the database after validating the input.
   * @param campaignData - The data for the new campaign.
   * @returns The newly created and saved Campaign entity.
   * @throws An error if validation fails.
   */
  public async create(campaignData: CreateCampaignDto): Promise<Campaign> {
    // Create an instance of the DTO class to apply decorators
    const campaignDto = new CreateCampaignDto();
    campaignDto.name = campaignData.name;
    campaignDto.description = campaignData.description;

    // Validate the DTO instance against the decorators
    const errors = await validate(campaignDto);
    if (errors.length > 0) {
      // Consolidate all validation error messages into a single error.
      const messages = errors
        .map((err) => Object.values(err.constraints!))
        .flat();
      throw new Error(`Validation failed: ${messages.join(', ')}`);
    }

    // If validation passes, proceed with creating and saving
    const newCampaign = this.typeormRepo.create(campaignDto);
    await this.typeormRepo.save(newCampaign);

    return newCampaign;
  }
}
