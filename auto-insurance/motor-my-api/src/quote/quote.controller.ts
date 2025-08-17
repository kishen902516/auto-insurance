import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteSessionDto } from './dto/create-quote-session.dto';
import { UpdateQuoteSessionDto } from './dto/update-quote-session.dto';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post('session')
  @HttpCode(HttpStatus.CREATED)
  async createSession(
    @Body(ValidationPipe) createQuoteSessionDto: CreateQuoteSessionDto,
  ) {
    return this.quoteService.createSession(createQuoteSessionDto);
  }

  @Get('session/:id')
  async getSession(@Param('id') id: string) {
    return this.quoteService.getSession(id);
  }

  @Put('session/:id')
  async updateSession(
    @Param('id') id: string,
    @Body(ValidationPipe) updateQuoteSessionDto: UpdateQuoteSessionDto,
  ) {
    return this.quoteService.updateSession(id, updateQuoteSessionDto);
  }
}