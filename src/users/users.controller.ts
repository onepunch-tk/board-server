import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/requests/create-user-request.dto';
import { SignInRequest } from './dto/requests/sign-in-request.dto';
import { UpdatePasswordRequest } from './dto/requests/update-password-request.dto';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger();
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  async createUser(@Body() createUserRequest: CreateUserRequest) {
    return this.usersService.createUser(createUserRequest);
  }

  @Get(':id')
  async getProfile(@Param('id') id: number) {
    return this.usersService.getProfile(id);
  }

  @Patch()
  async updateUser(@Body() updatePasswordRequest: UpdatePasswordRequest) {
    return this.usersService.updatePassword(updatePasswordRequest);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUserById(id);
  }
  @Patch()
  async signIn(@Body() signInRequest: SignInRequest) {
    return this.usersService.signIn(signInRequest);
  }
}
