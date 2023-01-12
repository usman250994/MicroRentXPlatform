import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { exceptionHandler } from 'src/helper/exceptionHandler';
import { ProductConstants } from 'src/shared/constant/product';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern(ProductConstants.topics.CREATE)
  async readMessage(@Payload() message: any) {
    return exceptionHandler(this.productService.createProduct(message));
  }

  @MessagePattern(ProductConstants.topics.UPDATE)
  async updateproduct(@Payload() message: any) {
    return exceptionHandler(this.productService.updateProduct(message));
  }

  @MessagePattern(ProductConstants.topics.FIND_ONE_BY_CONDITION)
  async getproductById(@Payload() message: any) {
    return exceptionHandler(
      this.productService.searchProductByConditions(message),
    );
  }

  @MessagePattern(ProductConstants.topics.FIND_ALL_BY_CONDITION)
  async findAllByCondition(@Payload() message: any) {
    return exceptionHandler(
      this.productService.searchProductByMultiMatch(message),
    );
  }

  @MessagePattern(ProductConstants.topics.GET_ALL)
  async geAllproducts() {
    return exceptionHandler(this.productService.findAllProducts());
  }

  @MessagePattern(ProductConstants.topics.DELETE)
  async deleteById(@Payload() message: any) {
    return exceptionHandler(
      this.productService.deleteProduct(message.elasticProductId),
    );
  }

  @MessagePattern(ProductConstants.topics.DELETE_ALL_PRODUCT_BY_USER)
  async deleteAllProductByUserId(@Payload() message: any) {
    return exceptionHandler(
      this.productService.deleteAllProductByUserId(message.userId),
    );
  }
}
