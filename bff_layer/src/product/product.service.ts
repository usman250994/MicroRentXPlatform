import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ProductConstants } from 'src/shared/constant/product';
import { ExceptionHandler } from 'src/shared/helper/exceptionHandler';

@Injectable()
export class ProductService {
  constructor(
    private exceptionHandler: ExceptionHandler,
    @Inject('PRODUCT')
    private readonly productMicroservice: ClientKafka,
  ) {}

  async createProduct(createProductDto: any): Promise<any> {
    return this.exceptionHandler.tryAndCatch(
      lastValueFrom(
        this.productMicroservice.send(
          ProductConstants.topics.CREATE,
          createProductDto,
        ),
      ),
    );
  }

  async updateProductProfile(updateProductDto: any) {
    return this.exceptionHandler.tryAndCatch(
      lastValueFrom(
        this.productMicroservice.send(
          ProductConstants.topics.UPDATE,
          updateProductDto,
        ),
      ),
    );
  }

  async findOneByCondition(dto: any): Promise<any> {
    return this.exceptionHandler.tryAndCatch(
      lastValueFrom(
        this.productMicroservice.send(
          ProductConstants.topics.FIND_ONE_BY_CONDITION,
          dto,
        ),
      ),
    );
  }

  async findAllByCondition(dto: any): Promise<any> {
    return this.exceptionHandler.tryAndCatch(
      lastValueFrom(
        this.productMicroservice.send(
          ProductConstants.topics.FIND_ALL_BY_CONDITION,
          dto,
        ),
      ),
    );
  }

  async findAll() {
    return this.exceptionHandler.tryAndCatch(
      lastValueFrom(
        this.productMicroservice.send(ProductConstants.topics.GET_ALL, {}),
      ),
    );
  }

  async deleteproductById(id: any) {
    return this.exceptionHandler.tryAndCatch(
      lastValueFrom(
        this.productMicroservice.send(ProductConstants.topics.DELETE, {
          elasticProductId: id,
        }),
      ),
    );
  }

  async deleteAllProductByUserId(id: any) {
    return this.exceptionHandler.tryAndCatch(
      lastValueFrom(
        this.productMicroservice.send(
          ProductConstants.topics.DELETE_ALL_PRODUCT_BY_USER,
          {
            userId: id,
          },
        ),
      ),
    );
  }
}
