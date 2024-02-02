import { Body, Controller, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/requests/create-user-request.dto';
import { SignInRequest } from './dto/requests/sign-in-request.dto';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger();
  constructor(private readonly usersService: UsersService) {}

  async createUser(@Body() createUserRequest: CreateUserRequest) {
    return this.usersService.createUser(createUserRequest);
  }

  async signIn(@Body() signInRequest: SignInRequest) {
    return this.usersService.signIn(signInRequest);
  }
}
