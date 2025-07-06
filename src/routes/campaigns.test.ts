// src/routes/campaigns.test.ts
import request from 'supertest';
import express, { Express } from 'express';
import { createCampaignsRouter } from './campaigns';
import { CampaignService } from '../services/CampaignService';
import { Campaign } from '../database/entities/Campaign';
import { ServiceError } from '../errors/ServiceError';
import { errorHandler } from '../middleware/errorHandler'; // <-- Import the handler

jest.mock('../services/CampaignService');

describe('POST /api/campaigns', () => {
  let app: Express;
  let mockCampaignService: jest.Mocked<CampaignService>;

  beforeEach(() => {
    mockCampaignService =
      new (CampaignService as jest.Mock<CampaignService>)() as jest.Mocked<CampaignService>;

    app = express();
    app.use(express.json());
    app.use('/api/campaigns', createCampaignsRouter(mockCampaignService));

    // Add the error handler to the test server instance.
    // This ensures our test environment behaves like production.
    app.use(errorHandler); // <-- This is the fix
  });

  it('should create a new campaign and return 201', async () => {
    // Arrange
    const campaignData = {
      name: 'Tomb of Annihilation',
      description: 'A deadly jungle adventure.',
    };
    const expectedCampaign: Campaign = {
      id: 'a-mocked-uuid',
      ...campaignData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockCampaignService.create.mockResolvedValue(expectedCampaign);

    // Act
    const response = await request(app)
      .post('/api/campaigns')
      .send(campaignData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      ...expectedCampaign,
      createdAt: expectedCampaign.createdAt.toISOString(),
      updatedAt: expectedCampaign.updatedAt.toISOString(),
    });
    expect(mockCampaignService.create).toHaveBeenCalledWith(campaignData);
    expect(mockCampaignService.create).toHaveBeenCalledTimes(1);
  });

  it('should return 400 if the campaign name is empty', async () => {
    // Arrange
    const invalidCampaignData = {
      name: '',
      description: 'This request should be rejected.',
    };
    const errorMessage = 'Validation failed: Campaign name cannot be empty.';

    mockCampaignService.create.mockRejectedValue(
      new ServiceError(errorMessage)
    );

    // Act
    const response = await request(app)
      .post('/api/campaigns')
      .send(invalidCampaignData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(errorMessage);
    expect(mockCampaignService.create).toHaveBeenCalledWith(
      invalidCampaignData
    );
  });
});
