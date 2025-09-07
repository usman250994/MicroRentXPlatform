import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/database/user.entity';
import { User as userObject } from 'src/shared/dto/user/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(
    createUserDto: any,
  ): Promise<ConflictException | userObject> {
    const findingOne = await this.userRepository.findBy({
      email: createUserDto.email,
    });
    if (!findingOne.length) {
      const res = this.userRepository.create(createUserDto);
      const user = await this.userRepository.save(res);
      const u = JSON.stringify(user);
      const u1 = JSON.parse(u);
      return u1;
      // return { id: u1.id, email: u1.email, password: u1.password };
    }
    throw new ConflictException();
  }

  async updateUser(updateUserDto: any): Promise<any> {
    const updatedData = await this.userRepository
      .createQueryBuilder('user')
      .update<User>(User, updateUserDto.userDetails)
      .where('id = :id', { id: updateUserDto.userId })
      .returning('*')
      .updateEntity(true)
      .execute();
    if (updatedData.raw.length) {
      return updatedData.raw[0];
    }
    throw new InternalServerErrorException('could not update user');
  }

  async findAllUsers(): Promise<any> {
    return this.userRepository.find();
  }

  async findOneByCondition(
    findOneByCondition: any,
  ): Promise<RpcException | userObject> {
    const user = await this.userRepository.findOneBy(findOneByCondition);
    if (!user) throw new NotFoundException();
    return user;
  }

  async findAllByCondition(dto): Promise<any> {
    const user = await this.userRepository.findBy(dto);
    if (!user) throw new NotFoundException();
    return user;
  }

  async deleteUserById(id: number): Promise<any> {
    const deleteResponse = await this.userRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException();
    }
    return true;
  }
}
