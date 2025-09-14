import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateStudentsDto } from './dto/create-students.dto/create-students.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find({ relations: ['courses'] });
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['courses'],
    });

    if (!student) {
      throw new NotFoundException(`student with id ${id} not found`);
    }

    return student;
  }

  async create(createStudentDto: CreateStudentsDto): Promise<Student> {
    const courses = await Promise.all(
      createStudentDto.courses.map((x) => this.preloadCourseByName(x)),
    );

    const student = this.studentRepository.create({
      ...createStudentDto,
      courses,
    });
    return this.studentRepository.save(student);
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const courses =
      updateStudentDto.courses &&
      (await Promise.all(
        updateStudentDto.courses.map((x) => this.preloadCourseByName(x)),
      ));
    const student = await this.studentRepository.preload({
      id,
      ...updateStudentDto,
      courses,
    });

    if (!student) {
      throw new NotFoundException(`student with id ${id} not found`);
    }

    return this.studentRepository.save(student);
  }

  async remove(id: number): Promise<DeleteResult> {
    // this is the fastest way to delete a student using its id or a condition
    // Does not trigger entity listeners or subscribers like (beforeRemove, afterRemove
    // return type:DeleteResult, not the deleted entity.
    // Use case: Fast, when you only know the id and don’t care about entity hooks or returning the removed entity.
    return await this.studentRepository.delete(id);

    // Or u can use this code bellow if you want to:
    // Removes a managed entity instance (must be loaded first).
    // Input: entity object (Student).
    // Return type: the entity instance that was removed.
    // Lifecycle hooks: triggers entity listeners/subscribers (beforeRemove, afterRemove).
    // Use case: when you need hooks to run, or you already have the entity instance in memory.
    // const student = await this.studentRepository.findOne({ where: { id } });

    // if (!student) {
    //   throw new NotFoundException(`student with id ${id} not found`);
    // }

    // return this.studentRepository.remove(student);
  }

  private async preloadCourseByName(name: string): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { name } });

    if (!course) {
      return this.courseRepository.create({ name });
    }

    return course;
  }
}
