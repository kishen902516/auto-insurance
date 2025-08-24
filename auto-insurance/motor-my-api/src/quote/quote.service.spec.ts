import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuoteSessionDto } from './dto/create-quote-session.dto';

describe('QuoteService', () => {
  let service: QuoteService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    quote: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuoteService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createSession', () => {
    it('should create a new quote session', async () => {
      const createQuoteSessionDto: CreateQuoteSessionDto = {
        postcode: '12345',
      };

      const mockQuote = {
        id: 'test-id',
        postcode: '12345',
        status: 'DRAFT',
        created_at: new Date('2024-01-01'),
        updated_at: new Date('2024-01-01'),
      };

      mockPrismaService.quote.create.mockResolvedValue(mockQuote);

      const result = await service.createSession(createQuoteSessionDto);

      expect(result).toEqual({
        id: 'test-id',
        postcode: '12345',
        status: 'draft',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      });

      expect(mockPrismaService.quote.create).toHaveBeenCalledWith({
        data: {
          id: expect.any(String),
          postcode: '12345',
          status: 'DRAFT',
          pricing_json: {},
        },
      });
    });
  });

  describe('getSession', () => {
    it('should return a quote session when found', async () => {
      const sessionId = 'test-id';
      const mockQuote = {
        id: sessionId,
        postcode: '12345',
        status: 'DRAFT',
        created_at: new Date('2024-01-01'),
        updated_at: new Date('2024-01-01'),
      };

      mockPrismaService.quote.findUnique.mockResolvedValue(mockQuote);

      const result = await service.getSession(sessionId);

      expect(result).toEqual({
        id: sessionId,
        postcode: '12345',
        status: 'draft',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      });
    });

    it('should throw NotFoundException when session not found', async () => {
      const sessionId = 'non-existent-id';
      mockPrismaService.quote.findUnique.mockResolvedValue(null);

      await expect(service.getSession(sessionId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateSession', () => {
    it('should update an existing quote session', async () => {
      const sessionId = 'test-id';
      const updateData = { postcode: '54321' };

      const mockExistingQuote = {
        id: sessionId,
        postcode: '12345',
        status: 'DRAFT',
        created_at: new Date('2024-01-01'),
        updated_at: new Date('2024-01-01'),
      };

      const mockUpdatedQuote = {
        ...mockExistingQuote,
        postcode: '54321',
        updated_at: new Date('2024-01-02'),
      };

      mockPrismaService.quote.findUnique.mockResolvedValue(mockExistingQuote);
      mockPrismaService.quote.update.mockResolvedValue(mockUpdatedQuote);

      const result = await service.updateSession(sessionId, updateData);

      expect(result).toEqual({
        id: sessionId,
        postcode: '54321',
        status: 'draft',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-02T00:00:00.000Z',
      });
    });

    it('should throw NotFoundException when updating non-existent session', async () => {
      const sessionId = 'non-existent-id';
      const updateData = { postcode: '54321' };

      mockPrismaService.quote.findUnique.mockResolvedValue(null);

      await expect(service.updateSession(sessionId, updateData)).rejects.toThrow(NotFoundException);
    });
  });
});