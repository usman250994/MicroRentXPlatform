import { Catch, ConsoleLogger, Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UserConsants } from 'src/shared/constant/user';
import { MyExceptionFilter } from 'src/shared/helper/exceptionHandler';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserConsants.topics.SIGNUP)
  async readMessage(@Payload() message: any) {
    // return this.exceptionHandler.tryAndCatch(
    //   this.userService.createUser(message),
    // );
  }

  @MessagePattern(UserConsants.topics.UPDATE)
  async updateUser(@Payload() message: any) {
    // return this.exceptionHandler.tryAndCatch(
    //   this.userService.updateUser(message),
    // );
  }

  @MessagePattern(UserConsants.topics.FIND_ONE_BY_CONDITION)
  async findOneByCondition(
    @Payload() message: Record<string, string | object>,
  ): Promise<any> {
    return this.userService.findOneByCondition(message);
  }

  @MessagePattern(UserConsants.topics.FIND_ALL_BY_CONDITION)
  async findAllByCondition(@Payload() message: any) {
    // return this.exceptionHandler.tryAndCatch(
    //   this.userService.findAllByCondition(message),
    // );
  }

  @MessagePattern(UserConsants.topics.GET_ALL)
  async geAllUsers() {
    // return this.exceptionHandler.tryAndCatch(this.userService.findAllUsers());
  }

  @MessagePattern(UserConsants.topics.DELETE)
  async deleteById(@Payload() message: any) {
    // return this.exceptionHandler.tryAndCatch(
    // this.userService.deleteUserById(message.userId),
    // );
  }
}
