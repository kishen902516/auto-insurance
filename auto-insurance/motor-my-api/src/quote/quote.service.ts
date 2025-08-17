import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuoteSessionDto } from './dto/create-quote-session.dto';
import { UpdateQuoteSessionDto } from './dto/update-quote-session.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class QuoteService {
  constructor(private prisma: PrismaService) {}

  async createSession(createQuoteSessionDto: CreateQuoteSessionDto) {
    const sessionId = randomUUID();
    
    const session = await this.prisma.quote.create({
      data: {
        id: sessionId,
        postcode: createQuoteSessionDto.postcode,
        status: 'DRAFT',
        pricing_json: {},
      },
    });

    return {
      id: session.id,
      postcode: session.postcode,
      status: session.status.toLowerCase(),
      createdAt: session.created_at.toISOString(),
      updatedAt: session.updated_at.toISOString(),
    };
  }

  async getSession(id: string) {
    const session = await this.prisma.quote.findUnique({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException('Quote session not found');
    }

    return {
      id: session.id,
      postcode: session.postcode,
      status: session.status.toLowerCase(),
      createdAt: session.created_at.toISOString(),
      updatedAt: session.updated_at.toISOString(),
    };
  }

  async updateSession(id: string, updateQuoteSessionDto: UpdateQuoteSessionDto) {
    const existing = await this.prisma.quote.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Quote session not found');
    }

    const session = await this.prisma.quote.update({
      where: { id },
      data: {
        postcode: updateQuoteSessionDto.postcode,
        updated_at: new Date(),
      },
    });

    return {
      id: session.id,
      postcode: session.postcode,
      status: session.status.toLowerCase(),
      createdAt: session.created_at.toISOString(),
      updatedAt: session.updated_at.toISOString(),
    };
  }
}