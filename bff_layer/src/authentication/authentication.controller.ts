import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Login } from 'src/shared/dto/user/login';
import { Signup } from 'src/shared/dto/user/signup';
import { ExceptionHandler } from 'src/shared/helper/exceptionHandler';
import { UserService } from 'src/user/user.service';

import { LocalAuthGaurd } from './local-auth-gaurd';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly userService: UserService,
    private readonly exceptionHandler: ExceptionHandler,
  ) {}

  @Post('/signup')
  async signUp(@Body() signupRequest: Signup) {
    return this.exceptionHandler.tryAndCatch(
      this.userService.createAndAuthorize(signupRequest),
    );
  }

  @UseGuards(LocalAuthGaurd)
  @Post('/login')
  async login(@Body() loginRequest: Login) {
    // no need for login method  may be
    return this.exceptionHandler.tryAndCatch(
      this.userService.login(loginRequest),
    );
  }
}
