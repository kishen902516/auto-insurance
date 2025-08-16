import { CryptoUtil } from './crypto.util';

describe('CryptoUtil', () => {
  describe('hashNRIC', () => {
    it('should hash NRIC consistently', () => {
      const nric = '123456789012';
      const hash1 = CryptoUtil.hashNRIC(nric);
      const hash2 = CryptoUtil.hashNRIC(nric);
      
      expect(hash1).toBeDefined();
      expect(hash1).toBe(hash2);
      expect(hash1.length).toBe(64); // SHA-256 hex length
    });

    it('should produce different hashes for different NRICs', () => {
      const nric1 = '123456789012';
      const nric2 = '123456789013';
      const hash1 = CryptoUtil.hashNRIC(nric1);
      const hash2 = CryptoUtil.hashNRIC(nric2);
      
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('generateToken', () => {
    it('should generate random tokens', () => {
      const token1 = CryptoUtil.generateToken();
      const token2 = CryptoUtil.generateToken();
      
      expect(token1).toBeDefined();
      expect(token2).toBeDefined();
      expect(token1).not.toBe(token2);
      expect(token1.length).toBe(64); // 32 bytes hex
    });
  });

  describe('password hashing', () => {
    it('should hash and verify passwords correctly', () => {
      const password = 'testPassword123';
      const hashedPassword = CryptoUtil.hashPassword(password);
      
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword.includes(':')).toBe(true);
      
      const isValid = CryptoUtil.verifyPassword(password, hashedPassword);
      expect(isValid).toBe(true);
      
      const isInvalid = CryptoUtil.verifyPassword('wrongPassword', hashedPassword);
      expect(isInvalid).toBe(false);
    });
  });
});