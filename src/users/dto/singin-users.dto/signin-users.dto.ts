import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsEmail()
  readonly email: string;

  // @IsStrongPassword()
  @IsString()
  readonly password: string;

  @IsString()
  readonly userName: string;
}
