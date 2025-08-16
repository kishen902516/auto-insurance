import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('magic-link')
  async sendMagicLink(@Body('email') email: string) {
    const link = await this.authService.generateMagicLink(email);
    return { success: true, message: 'Magic link sent' };
  }

  @Post('verify')
  async verifyMagicLink(@Body('token') token: string) {
    const isValid = await this.authService.validateMagicLink(token);
    return { valid: isValid };
  }
}