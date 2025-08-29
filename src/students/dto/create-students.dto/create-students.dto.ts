import { IsNumber, IsString } from 'class-validator';

export class CreateStudentsDto {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly age: number;
  @IsString({ each: true })
  readonly address: string[];
}
