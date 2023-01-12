import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticService {
  index = 'products';
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  createMatches(obj) {
    return Object.entries(obj).map(([key, value]) => ({
      match: { [key]: value },
    }));
  }

  async addProduct(product: any): Promise<any> {
    const a = await this.elasticsearchService.index({
      index: this.index,
      body: product,
    });
    return a.body._id;
  }

  createLocationQuery({ lat, long }: any) {
    return {
      sort: [
        {
          geo_distance: {
            prodLocation: [lat, long], // center location
            order: 'asc', // sorted by closest distance
            unit: 'km',
            mode: 'min',
            distance_type: 'arc',
            ignore_unmapped: true,
          },
        },
      ],
    };
  }

  async searchAllProduct(): Promise<any> {
    const response = await this.elasticsearchService.search({
      index: this.index,
      body: {
        query: {
          match_all: {},
        },
      },
    });
    return response.body.hits.hits;
  }

  async searchProductByMultiMatch(obj: any): Promise<any> {
    let sort = null;
    if (obj.location) {
      sort = this.createLocationQuery(obj.location);
    }
    const response = await this.elasticsearchService.search({
      index: this.index,
      body: {
        ...(sort && sort),
        query: {
          multi_match: {
            query: Object.values(obj).join(' '),
            type: 'best_fields',
            fields: Object.keys(obj),
          },
        },
      },
    });
    return response.body.hits.hits;
  }

  async searchProductByConditions(obj: any): Promise<any> {
    let sort = null;
    if (obj.location) {
      sort = this.createLocationQuery(obj.location);
    }
    const response = await this.elasticsearchService.search({
      index: this.index,
      body: {
        ...(sort && sort),
        query: {
          bool: {
            must: this.createMatches(obj),
          },
        },
      },
    });
    return response.body.hits.hits;
  }

  createUpdateProductScript(obj: any) {
    delete obj['_id'];
    const script = Object.entries(obj).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');
    return script;
  }

  async updateProduct(updateProductDto: any): Promise<any> {
    const updateScript = this.createUpdateProductScript({
      ...updateProductDto,
    });
    const response = await this.elasticsearchService.updateByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            _id: updateProductDto._id,
          },
        },
        script: {
          inline: updateScript,
        },
      },
    });
    return response.body.updated;
  }

  async removeProduct(dto: any): Promise<any> {
    const res = await this.elasticsearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: dto,
        },
      },
    });
    return res.body.deleted;
  }
}
