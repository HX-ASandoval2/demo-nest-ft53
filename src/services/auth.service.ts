import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDbService } from './user-db.service';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userDBService: UserDbService,
    private readonly jwtService: JwtService,
  ) {}

  //? Registro del usuario:
  async signUp(user: User) {
    const findUser = await this.userDBService.findByEmail(user.email);

    if (findUser) throw new BadRequestException('Email already exists');

    //? Hasheamos contraseña:
    const hashedPassword = await bcrypt.hash(user.password, 10);

    if (!hashedPassword)
      throw new BadRequestException('La contraseña no pudo ser hasheada');

    this.userDBService.create({ ...user, password: hashedPassword });

    return 'El usuario se ha creado satisfactoriamente';
  }

  //? Inicio de sesión del usuario:
  async signIn(email: string, password: string) {
    const user = await this.userDBService.findByEmail(email);

    if (!user) throw new BadRequestException('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new BadRequestException('Invalid Credentials');

    const userPayload = {
      id: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(userPayload);

    console.log(token);

    return {
      message: 'El usuario se ha logueado satisfactoriamente',
      token,
    };
  }
}
