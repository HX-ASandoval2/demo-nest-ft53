import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserSignDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  password: string;
}
