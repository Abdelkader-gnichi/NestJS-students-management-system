import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStudentsDto {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly age: number;
  @IsOptional()
  @IsString({ each: true })
  readonly address: string[];

  @IsString({ each: true })
  readonly courses: string[];
}
