import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentsDto } from './dto/create-students.dto/create-students.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';
import { Student } from './entities/student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Get()
  getAllStudents() {
    return this.studentService.findAll();
  }

  @Get(':id')
  getStudentById(@Param('id') id: number) {
    return this.studentService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) // this is another way to set status code
  async createStudent(
    @Body() createStudentDto: CreateStudentsDto,
  ): Promise<{ message: string; student: Student }> {
    // by default nestjs handles the status code automatically for you, just return body
    // return this.studentService.create(createStudentDto);
    const createdStudent = await this.studentService.create(createStudentDto);
    return {
      message: 'Student created successfully',
      student: createdStudent,
    };
  }

  @Put(':id')
  updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  deleteStudent(@Param('id') id: number) {
    return this.studentService.remove(id);
  }
}
