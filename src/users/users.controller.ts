import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { SignInDto } from './dto/singin-users.dto/signin-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Post()
  userSignUp(@Body() user) {
    return this.userService.signUp(user);
  }

  @Post('login')
  login(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto.userName, signInDto.password);
  }

  
}
