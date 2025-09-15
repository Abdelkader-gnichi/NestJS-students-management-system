import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentsDto } from '../create-students.dto/create-students.dto';

export class UpdateStudentDto extends PartialType(CreateStudentsDto) {
  // uing PartialType we can inherit all the properties of CreateStudentsDto,
  // or without PartialType you need to redefine then manually as in CreateStudentsDto but this breaks
  // the DRY principle.
  // @IsString()
  // readonly name?: string;
  // @IsNumber()
  // readonly age?: number;
  // @IsString({ each: true })
  // readonly address?: string[];
}
