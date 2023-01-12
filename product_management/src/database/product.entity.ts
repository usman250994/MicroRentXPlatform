import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProductType {
  ELECTRIC = 'electric',
  BIKE = 'bike',
  XYZ = 'xyz',
}

export enum ProductRentTimeType {
  HOURLY = 'hourly',
  THREEHOUR = '3 hour',
  FIVEHOUR = '5 hour',
  TWELVEHOUR = '12 hour',
  TWENTYFOURHOUR = '24 hour',
  MONTHLY = 'monthly',
}

export enum ProductRentPriceType {
  DOLLAR = 'dollar',
  EURO = 'euro',
  PKR = 'pkr',
}

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ nullable: true })
  public picture: string;

  @Column({
    type: 'enum',
    enum: ProductType,
    default: ProductType.XYZ,
  })
  category: ProductType;

  @Column()
  public details: string;

  @Column()
  public number: string;

  @Column()
  public email: string;

  @Column({ nullable: true, default: '3' })
  public rating: string;

  @Column({
    type: 'enum',
    enum: ProductRentTimeType,
    default: ProductRentTimeType.HOURLY,
  })
  rentTimeType: ProductRentTimeType;

  @Column()
  public latitude: string;

  @Column()
  public longitude: string;

  @Column({
    type: 'enum',
    enum: ProductRentPriceType,
    default: ProductRentPriceType.DOLLAR,
  })
  currencyType: ProductRentPriceType;

  @Column({ nullable: true })
  public price: string;

  @Column({ nullable: true })
  public elasticsearchId: string;

  @Column({ nullable: true })
  public ownerId: string;

  @CreateDateColumn({ nullable: true })
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  public updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

export default Product;
