import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
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
import { ProductService } from './product.service';

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
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createProduct(@Body() signupProductRequestDto: any) {
    return this.productService.createProduct(signupProductRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateProduct(@Body() productDetailsDto: any) {
    return this.productService.updateProductProfile(productDetailsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/allProducts')
  async geAlltProducts() {
    return this.productService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/products')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getProductByCondition(@Query() query) {
    return this.productService.findAllByCondition(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getProductById(@Query() query) {
    return this.productService.findOneByCondition(query);
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
  async uplaodproductPicture(
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
  ) {
    return this.productService.updateProductProfile(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteProductById(@Query('id') query) {
    return this.productService.deleteproductById(query);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/deleteAllProductByUser')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteAllProductByUserId(@Query() query) {
    return this.productService.deleteAllProductByUserId(query);
  }
}
