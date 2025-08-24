import * as crypto from 'crypto';

export class CryptoUtil {
  private static readonly SALT_ROUNDS = 10;

  static hashNRIC(nric: string): string {
    // Use a consistent salt for NRIC hashing to allow lookups
    const salt = process.env.NRIC_SALT || 'default-salt-change-in-production';
    return crypto
      .createHash('sha256')
      .update(nric + salt)
      .digest('hex');
  }

  static generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
  }

  static verifyPassword(password: string, hashedPassword: string): boolean {
    const [salt, hash] = hashedPassword.split(':');
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === verifyHash;
  }
}