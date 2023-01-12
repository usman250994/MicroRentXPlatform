import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsNumberString } from 'class-validator';
import { diskStorage, Multer } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/authentication/gaurds/jwt-authentication-gaurds';
import { UserService } from './user.service';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file: Express.Multer.File, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export class FindByNumberId {
  @IsNumberString()
  id: number;
}

@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Put('/update')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(@Body() userDetailsDto: any) {
    return this.userservice.updateUserProfile(userDetailsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/allUsers')
  async geAlltUsers() {
    return this.userservice.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getUserByCondition(@Query() query) {
    return this.userservice.findAllByCondition(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getUserById(@Query() query) {
    return this.userservice.findOneByCondition(query);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/uploadPicture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploadedFiles',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 1024 * 1023 },
    }),
  )
  async uplaodUserPicture(
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userservice.updateUserProfile({
      ...body,
      dto: { ...body.dto, picture: file.path },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteUserById(@Query() query) {
    return this.userservice.deleteUserById(query);
  }
}
