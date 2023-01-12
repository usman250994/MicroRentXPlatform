import { IsNotEmpty } from 'class-validator';

enum ProductType {
  ELECTRIC = 'electric',
  BIKE = 'bike',
  XYZ = 'xyz',
}

enum ProductRentTimeType {
  HOURLY = 'hourly',
  THREEHOUR = '3 hour',
  FIVEHOUR = '5 hour',
  TWELVEHOUR = '12 hour',
  TWENTYFOURHOUR = '24 hour',
  MONTHLY = 'monthly',
}

export class Product {
  @IsNotEmpty()
  _id: number;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  picture: string;
  @IsNotEmpty()
  category: ProductType;
  @IsNotEmpty()
  details: string;
  @IsNotEmpty()
  number: string;
  @IsNotEmpty()
  rating: string;
  @IsNotEmpty()
  rentalTimeType: ProductRentTimeType;
  @IsNotEmpty()
  price: string;
  @IsNotEmpty()
  ownerId: string;
  @IsNotEmpty()
  latitude: string;
  @IsNotEmpty()
  longitude: string;
}
