// src/database/repositories/CampaignRepository.test.ts
import { DataSource, Repository } from 'typeorm';
import { Campaign } from '../entities/Campaign';
import { CampaignRepository } from './CampaignRepository';

describe('CampaignRepository', () => {
  let dataSource: DataSource;
  let typeormRepo: Repository<Campaign>;

  // Before all tests, create and initialize an in-memory SQLite data source
  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:', // Key for in-memory database
      entities: [Campaign],
      synchronize: true, // Creates the schema automatically
    });

    await dataSource.initialize();
    typeormRepo = dataSource.getRepository(Campaign);
  });

  // After all tests, destroy the connection
  afterAll(async () => {
    await dataSource.destroy();
  });

  // Before each test, clear the table to ensure a clean state
  beforeEach(async () => {
    await typeormRepo.clear();
  });

  describe('create', () => {
    it('should create a new campaign and save it to the database', async () => {
      // Arrange
      // This will fail because the constructor doesn't accept an argument yet
      const campaignRepository = new CampaignRepository(typeormRepo);
      const campaignData = {
        name: 'The Lost Mines of Phandelver',
        description: 'A classic D&D adventure.',
      };

      // Act
      const newCampaign = await campaignRepository.create(campaignData);

      // Assert
      expect(newCampaign).toBeDefined();
      expect(newCampaign.id).toBeDefined();
      expect(newCampaign.name).toBe(campaignData.name);
      expect(newCampaign.description).toBe(campaignData.description);

      // Also assert that it was actually saved in the database
      const savedCampaign = await typeormRepo.findOneBy({ id: newCampaign.id });
      expect(savedCampaign).not.toBeNull();
      expect(savedCampaign?.name).toBe(campaignData.name);
    });

    it('should throw an error if the campaign name is empty', async () => {
      // Arrange
      const campaignRepository = new CampaignRepository(typeormRepo);
      const invalidData = {
        name: '', // Invalid: name is empty
        description: 'This should fail.',
      };

      // Act & Assert
      // We expect the create method to reject the promise because of invalid input.
      await expect(campaignRepository.create(invalidData)).rejects.toThrow();
    });

    it('should throw an error if the campaign name is too long', async () => {
      // Arrange
      const campaignRepository = new CampaignRepository(typeormRepo);
      const invalidData = {
        name: 'a'.repeat(256), // Invalid: name exceeds 255 char limit
        description: 'This name is too long.',
      };

      // Act & Assert
      await expect(campaignRepository.create(invalidData)).rejects.toThrow();
    });
  });
});
