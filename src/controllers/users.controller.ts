import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserAuthGuard } from 'src/guards/user-auth.guard';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';
import { UserService } from 'src/services/users.service';

@Controller('users')
@UseGuards(UserAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@Query('name') name: string): any {
    if (name) return this.userService.getByName(name);
    return this.userService.getUsers();
  }

  @Get('profile')
  getUserProfile(@Headers('token') token: string) {
    if (token !== '1234') return 'Acceso denegado';
    return 'Esta ruta devuelve el perfil del usuario';
  }

  @Get('profile/images')
  @UseGuards(UserAuthGuard)
  getProfilePics() {
    return 'Esta ruta devuelve las imágenes del perfil del usuario';
  }

  @HttpCode(418)
  @Get('coffee')
  makeCoffee() {
    return 'No puedo preparar café, soy una tetera';
  }

  @Get('message')
  getMessage(@Res() response) {
    response.status(200).send('Este es un mensaje con el decorador @Res()');
  }

  @Get('request')
  getRequest(@Req() request) {
    console.log(request);

    return 'Esta ruta devuelve la request';
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  @UseInterceptors(DateAdderInterceptor)
  createUser(@Body() user: any, @Req() request) {
    const modifiedUser = { ...user, createAt: request.now };
    return this.userService.createUser(modifiedUser);
  }

  @Put()
  updateUser() {
    return 'Esta ruta actualiza un usuario';
  }

  @Delete()
  deleteUser() {
    return 'Esta ruta elimina un usuario';
  }
}
