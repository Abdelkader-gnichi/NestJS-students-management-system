import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Get()
  getAllStudents() {
    return 'All students info retrived successfully';
  }

  @Get(':id')
  getStudentById(@Param('id') id: string) {
    return `student with id ${id} info retrived successfully`;
  }

  @Post()
  // @HttpCode(HttpStatus.GONE) // this is another way to set status code
  createStudent(@Body() body: unknown, @Res() response) {
    // by default nestjs handles the status code automatically for you, just return body
    return response.status(201).json(body);
  }

  @Put(':id')
  updateStudent(@Param('id') id: string, @Body() body: unknown): unknown {
    return `student with id ${id} info updated successfully
            this is the new data ${JSON.stringify(body)}`;
  }

  @Delete(':id')
  deleteStudent(@Param('id') id: string) {
    return `student with id ${id} record deleted successfully`;
  }
}
