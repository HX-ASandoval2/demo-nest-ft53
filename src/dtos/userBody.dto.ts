import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserBodyDto {
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  createdAt: string;

  @IsBoolean()
  isAdmin: boolean;
}
