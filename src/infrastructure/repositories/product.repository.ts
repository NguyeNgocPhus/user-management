import { ProductRealModel } from './../../core/domain/entities/product.entity';
import { Entity, EntityRepository, Repository } from 'typeorm';

@EntityRepository(ProductRealModel)
export class ProductPerository extends Repository<ProductRealModel> {}
