import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  card_id: string;
}
