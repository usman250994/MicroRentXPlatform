import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Product from 'src/database/product.entity';
import { Repository } from 'typeorm';
import { ElasticService } from 'src/elastic/elastic.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private elasticSearchRepository: ElasticService,
  ) {}

  async createProduct({ prodDto, userId }: any): Promise<any> {
    const ProductE = await this.elasticSearchRepository.addProduct({
      ...prodDto,
      userId,
      ...(prodDto.lat &&
        prodDto.lon && {
          prodLocation: { lat: prodDto.lat, lon: prodDto.lon },
        }),
    });
    if (ProductE) {
      const productP = await this.productRepository.save({
        ...prodDto,
        elasticsearchId: ProductE,
        userId,
      });
      const productRaw = JSON.parse(JSON.stringify(productP));
      return productRaw;
    } else throw new InternalServerErrorException();
  }

  async findAllProducts(): Promise<any> {
    const res = await this.elasticSearchRepository.searchAllProduct();
    if (!res) throw new NotFoundException();
    return res;
  }

  async searchProductByMultiMatch(dto: any): Promise<any> {
    const location = { lat: dto.lat, lon: dto.lon };
    delete dto['lat'];
    delete dto['lon'];
    const res = await this.elasticSearchRepository.searchProductByMultiMatch({
      ...dto,
      location,
    });
    if (!res) throw new NotFoundException();
    return res;
  }

  async searchProductByConditions(dto: any): Promise<any> {
    const location = { lat: dto.lat, lon: dto.lon };
    delete dto['lat'];
    delete dto['lon'];
    const res = await this.elasticSearchRepository.searchProductByConditions({
      ...dto,
      location,
    });
    if (!res) throw new NotFoundException();
    return res;
  }

  async updateProduct({ productDetails }: any): Promise<any> {
    const _id = productDetails._id;
    const updatedProduct = await this.elasticSearchRepository.updateProduct(
      productDetails,
    );
    delete productDetails['_id'];
    if (updatedProduct) {
      const updatedData = await this.productRepository
        .createQueryBuilder('product')
        .update<Product>(Product, productDetails)
        .where('elasticsearchId = :elasticsearchId', { elasticsearchId: _id })
        .returning('*')
        .updateEntity(true)
        .execute();

      if (updatedData.raw.length) {
        return updatedData.raw[0];
      } else
        throw new InternalServerErrorException('elastic search update failed');
    } else throw new InternalServerErrorException('postgresQl updated failed');
  }

  async deleteProduct(id): Promise<any> {
    const resOfEl = await this.elasticSearchRepository.removeProduct({
      _id: id,
    });
    if (resOfEl) {
      const deleteResponse = await this.productRepository
        .createQueryBuilder('Product')
        .softDelete()
        .where('elasticsearchId = :elasticsearchId', {
          elasticsearchId: id,
        })
        .execute();
      if (!deleteResponse.affected) {
        throw new InternalServerErrorException('psotgrsQl Delete failed');
      }
      return true;
    }
    throw new InternalServerErrorException('elastic delete failed');
  }

  async deleteAllProductByUserId(userId): Promise<any> {
    const resOfEl = await this.elasticSearchRepository.removeProduct({
      userId,
    });
    if (resOfEl) {
      const updatedData = await this.productRepository
        .createQueryBuilder('Product')
        .softDelete()
        .where('userId = :userId', { userId: userId })
        .execute();
      if (!updatedData.raw.length) {
        throw new InternalServerErrorException('psotgrsQl Delete failed');
      }
      return true;
    }
    throw new InternalServerErrorException('elastic delete failed');
  }
}
