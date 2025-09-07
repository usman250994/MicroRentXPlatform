import { forwardRef, Inject, Injectable, UseFilters } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, map } from 'rxjs';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { PasswordService } from 'src/authentication/password.service';
import { UserConsants } from 'src/shared/constant/user';
import {
  ExceptionHandler,
  MyExceptionFilter,
} from 'src/shared/helper/exceptionHandler';

@Injectable()
export class UserService {
  constructor(
    private passwordService: PasswordService,
    @Inject(forwardRef(() => AuthenticationService))
    private authenticationService: AuthenticationService,
    private exceptionhandler: ExceptionHandler,

    @Inject(UserConsants.NAME) private readonly userMicroservice: ClientKafka,
  ) {}

  public async createAndAuthorize(signupUserRequestDto: any): Promise<any> {
    const encryptPassword = await this.passwordService.hash(
      signupUserRequestDto.password,
    );
    const resp = await lastValueFrom(
      this.userMicroservice.send(UserConsants.topics.SIGNUP, {
        ...signupUserRequestDto,
        password: encryptPassword,
      }),
    );
    return this.authenticationService.authorize(resp);
  }

  public async login(dto: any) {
    const resp = await this.findOneByCondition(dto);
    return this.authenticationService.authorize(resp);

  }

  @UseFilters(MyExceptionFilter)
  async findOneByCondition(dto: any): Promise<any> {
    const h = await lastValueFrom(
      this.userMicroservice.send(
        UserConsants.topics.FIND_ONE_BY_CONDITION,
        dto,
      ),
    );
    if (h instanceof RpcException) {
      throw h;
    }
    return h;
  }

  async findAllByCondition(dto: any): Promise<any> {
    return this.exceptionhandler.tryAndCatch(
      lastValueFrom(
        this.userMicroservice.send(
          UserConsants.topics.FIND_ALL_BY_CONDITION,
          dto,
        ),
      ),
    );
  }

  async updateUserProfile(updateUserDto: any) {
    return this.exceptionhandler.tryAndCatch(
      lastValueFrom(
        this.userMicroservice.send(UserConsants.topics.UPDATE, updateUserDto),
      ),
    );
  }

  async findAll() {
    return this.exceptionhandler.tryAndCatch(
      lastValueFrom(
        this.userMicroservice.send(UserConsants.topics.GET_ALL, {}),
      ),
    );
  }

  async deleteUserById(id: number) {
    return this.exceptionhandler.tryAndCatch(
      lastValueFrom(
        this.userMicroservice.send(UserConsants.topics.DELETE, { userId: id }),
      ),
    );
  }
}
