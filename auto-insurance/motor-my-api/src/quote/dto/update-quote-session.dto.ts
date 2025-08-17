import { IsOptional, IsString, Matches, Length } from 'class-validator';

export class UpdateQuoteSessionDto {
  @IsOptional()
  @IsString()
  @Length(5, 5, { message: 'Postcode must be exactly 5 digits' })
  @Matches(/^\d{5}$/, { message: 'Postcode must be 5 digits' })
  postcode?: string;
}