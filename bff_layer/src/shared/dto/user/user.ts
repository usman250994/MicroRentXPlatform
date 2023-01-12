import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class User {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsNumber()
  number: number;
  //have to decvide upon which validator to use
  picture: string;
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsString()
  rating: string;
}
