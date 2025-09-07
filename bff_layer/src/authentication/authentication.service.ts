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

    const userLoginResponse = await this.userService.findOneByCondition({
      email: email,
    });

    // NOTE: temporarily disabled for testing purpose only
    
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
