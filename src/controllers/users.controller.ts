import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserBodyDto } from 'src/dtos/userBody.dto';
import { UserSignDto } from 'src/dtos/usersBody.dto';
import { UserAuthGuard } from 'src/guards/user-auth.guard';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';
import { MinSizeValidationPipe } from 'src/pipes/MinSizeValidator.pipes';
import { AuthService } from 'src/services/auth.service';
import { CloudinaryService } from 'src/services/cloudinary.service';
import { UserDbService } from 'src/services/user-db.service';
import { UserService } from 'src/services/users.service';

@Controller('users')
// @UseGuards(UserAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userDBService: UserDbService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(UserAuthGuard)
  getUsers(@Query('name') name: string): any {
    if (name) return this.userService.getByName(name);
    return this.userService.getUsers();
  }

  @Get('profile')
  @UseGuards(UserAuthGuard)
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
  @UseGuards(UserAuthGuard)
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userDBService.getUser(id);

    console.log(user);

    if (!user) throw new NotFoundException('Usuario no encontrado');

    return user;
  }

  @Post()
  @UseInterceptors(DateAdderInterceptor)
  createUser(@Body() user: UserBodyDto, @Req() request) {
    const modifiedUser = { ...user, createdAt: request.now };
    // return this.userService.createUser(modifiedUser);
    // return this.userDBService.create(modifiedUser);
    return this.authService.signUp(modifiedUser);
  }

  @Post('signin')
  signIn(@Body() user: UserSignDto) {
    return this.authService.signIn(user.email, user.password);
  }

  @Post('profile/images')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(MinSizeValidationPipe)
  async uploadProfilePic(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 3000000,
            message: 'El archivo debe ser menor a 100kb',
          }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp|gif|svg)/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.cloudinaryService.uploadImage(file);
  }

  @Put()
  updateUser() {
    return 'Esta ruta actualiza un usuario';
  }

  @Delete()
  deleteUser() {
    // throw Error();
    try {
      throw Error();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.I_AM_A_TEAPOT,
          error: 'Envío de cafecito fallido',
        },
        HttpStatus.I_AM_A_TEAPOT,
      );
    }
  }
}
