import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignInDto } from './dto/singin-users.dto/signin-users.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { SignUpDto } from './dto/singin-users.dto/signup-users.dto';
import type { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Post()
  userSignUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @Post('login')
  login(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto.userName, signInDto.password);
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('profile')
  userProfile(@Req() request: Request) {
    return request.user;
  }
}
