import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    private passwordService: PasswordService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('valide user chala ha');
    const userLoginResponse = await this.userService.findOneByCondition({
      email: email,
    });

    // const userPassword = await this.passwordService.compareHash(
    //   password,
    //   userLoginResponse.password,
    // );
    // if (userPassword) {
    //   return userLoginResponse;
    // }
    // throw new ForbiddenException();
  }

  authorize(signupUserResponseDto: any): any {
    console.log('in step  2 of login');
    const jwtSignPayload = {
      email: signupUserResponseDto.email,
      id: signupUserResponseDto.id,
    };
    return {
      accessToken: this.jwtService.sign(jwtSignPayload),
      id: signupUserResponseDto.id,
      name: signupUserResponseDto.name,
      email: signupUserResponseDto.email,
    };
  }
}
