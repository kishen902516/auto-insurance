import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateMagicLink', () => {
    it('should generate a magic link for valid email', async () => {
      const email = 'test@example.com';
      const result = await service.generateMagicLink(email);
      
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('validateMagicLink', () => {
    it('should validate magic link token', async () => {
      const token = 'test-token';
      const result = await service.validateMagicLink(token);
      
      expect(typeof result).toBe('boolean');
    });
  });
});