// src/services/CampaignService.test.ts
import { CampaignService } from './CampaignService';
import {
  CampaignRepository,
  CreateCampaignDto,
} from '../database/repositories/CampaignRepository';
import { Campaign } from '../database/entities/Campaign';
import { ServiceError } from '../errors/ServiceError';

// We create a mock version of the CampaignRepository.
// Jest will replace the actual implementation with a mock object.
const mockCampaignRepository: jest.Mocked<Pick<CampaignRepository, 'create'>> =
  {
    create: jest.fn(),
  };

describe('CampaignService', () => {
  // Before each test, reset the mock to ensure a clean state
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call the repository to create a campaign and return the result', async () => {
      // Arrange
      const campaignData: CreateCampaignDto = {
        name: 'Curse of Strahd',
        description: 'A gothic horror adventure.',
      };

      const expectedCampaign: Campaign = {
        id: 'a-unique-uuid',
        ...campaignData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Configure our mock repository's 'create' method to return our expected campaign
      mockCampaignRepository.create.mockResolvedValue(expectedCampaign);

      // This will fail because CampaignService doesn't exist yet
      const campaignService = new CampaignService(
        mockCampaignRepository as unknown as CampaignRepository
      );

      // Act
      const result = await campaignService.create(campaignData);

      // Assert
      // 1. Ensure the repository's create method was called correctly
      expect(mockCampaignRepository.create).toHaveBeenCalledWith(campaignData);
      expect(mockCampaignRepository.create).toHaveBeenCalledTimes(1);

      // 2. Ensure the service returned the value from the repository
      expect(result).toEqual(expectedCampaign);
    });

    it('should throw an error if validation fails', async () => {
      // Arrange
      const campaignService = new CampaignService(
        mockCampaignRepository as unknown as CampaignRepository
      );
      const invalidData: CreateCampaignDto = {
        name: '', // Invalid: name is empty
        description: 'This should fail.',
      };

      // Act & Assert
      // We expect the service to throw an error before it ever calls the repository.
      await expect(campaignService.create(invalidData)).rejects.toThrow(
        ServiceError
      );

      // Also, assert that the repository's create method was never called.
      expect(mockCampaignRepository.create).not.toHaveBeenCalled();
    });

    it('should throw a ServiceError if the repository fails', async () => {
      // Arrange
      const campaignService = new CampaignService(
        mockCampaignRepository as unknown as CampaignRepository
      );
      const campaignData: CreateCampaignDto = {
        name: 'Valid Campaign',
        description: 'A valid description.',
      };
      const repositoryError = new Error('Database connection lost');

      // Configure the mock to simulate a repository failure
      mockCampaignRepository.create.mockRejectedValue(repositoryError);

      // Act & Assert
      // We expect the service to catch the raw error and throw its own,
      // more abstract ServiceError.
      await expect(campaignService.create(campaignData)).rejects.toThrow(
        ServiceError
      );
    });

    it('should trim whitespace from the campaign name before creating', async () => {
      // Arrange
      const campaignService = new CampaignService(
        mockCampaignRepository as unknown as CampaignRepository
      );
      const campaignDataWithWhitespace: CreateCampaignDto = {
        name: '  The Sunken Citadel  ',
        description: 'An adventure full of traps.',
      };
      const expectedTrimmedData: CreateCampaignDto = {
        name: 'The Sunken Citadel',
        description: 'An adventure full of traps.',
      };
      const expectedCampaign: Campaign = {
        id: 'a-unique-uuid-for-trim-test',
        ...expectedTrimmedData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Configure the mock to return a successful creation
      mockCampaignRepository.create.mockResolvedValue(expectedCampaign);

      // Act
      await campaignService.create(campaignDataWithWhitespace);

      // Assert
      // The most important assertion: ensure the repository was called with the trimmed data.
      expect(mockCampaignRepository.create).toHaveBeenCalledWith(
        expectedTrimmedData
      );
    });
  });
});
