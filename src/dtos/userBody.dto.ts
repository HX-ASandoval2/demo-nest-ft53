import { ApiHideProperty } from '@nestjs/swagger';
import {
  // IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class UserBodyDto {
  @ApiHideProperty()
  id: string;

  /**
   * Este es el name
   * @example Blacky
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * Este es el email
   * @example black@mail.com
   */
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  /**
   * Esta es la password
   * @example Black&123
   */
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @Length(4, 10)
  password: string;

  @ApiHideProperty()
  createdAt: string;

  isAdmin?: boolean;
}

export class UserSignInDto {
  /**
   * Este es el email
   * @example black@mail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Esta es la password
   * @example Black&123
   */
  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  password: string;
}
