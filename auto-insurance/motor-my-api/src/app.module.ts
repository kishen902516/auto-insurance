import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { QuoteModule } from './quote/quote.module';
import { PolicyModule } from './policy/policy.module';
import { PaymentsModule } from './payments/payments.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { ClaimsModule } from './claims/claims.module';

@Module({
  imports: [
    AuthModule,
    QuoteModule,
    PolicyModule,
    PaymentsModule,
    IntegrationsModule,
    ClaimsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
