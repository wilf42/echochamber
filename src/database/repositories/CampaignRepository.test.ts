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
      database: ':memory:',
      entities: [Campaign],
      synchronize: true,
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
      const campaignRepository = new CampaignRepository(typeormRepo);
      const campaignData = {
        name: 'The Lost Mines of Phandelver',
        description: 'A classic D&D adventure.',
      };

      // Act
      const newCampaign = await campaignRepository.create(campaignData);

      // Assert
      // 1. Verify the method returned a valid-looking campaign object
      expect(newCampaign).toBeDefined();
      expect(newCampaign.id).toEqual(expect.any(String)); // More specific than toBeDefined()

      // 2. Verify the campaign was correctly persisted in the database by fetching it again
      const savedCampaign = await typeormRepo.findOneBy({ id: newCampaign.id });
      expect(savedCampaign).not.toBeNull();
      expect(savedCampaign).toEqual(
        expect.objectContaining({
          name: 'The Lost Mines of Phandelver',
          description: 'A classic D&D adventure.',
        })
      );
    });
  });
});
