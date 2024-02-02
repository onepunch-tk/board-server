import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from './dto/requests/create-user-request.dto';
import { SignInRequest } from './dto/requests/sign-in-request.dto';
import { UpdatePasswordRequest } from './dto/requests/update-password-request.dto';
import { UserDto } from './dto/user.dto';
import { CreateUserResponse } from './dto/responses/create-user-response.dto';
import { passwordHashing } from '../utils/hash.util';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    createUserRequest: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    try {
      const duplicated = await this.isDuplicatedUserByUsername(
        createUserRequest.username,
      );
      if (duplicated) {
        throw new Error('ID가 존재합니다.');
      }

      const { success, hash } = await passwordHashing(
        createUserRequest.password,
      );
      if (!success) {
        throw new Error('아이디 생성에 실패.');
      }

      delete createUserRequest.password;

      const createdUser = await this.prisma.user.create({
        data: {
          hash,
          ...createUserRequest,
        },
      });

      return {
        success: true,
        user: createdUser,
      };
    } catch (e) {
      return {
        success: false,
        error: e.message,
      };
    }
  }
  async signIn(signInRequest: SignInRequest): Promise<UserDto> {}

  async isDuplicatedUserByUsername(username: string): Promise<boolean> {}
  async getUser(userId: number): Promise<UserDto> {}

  async updatePassword({
    id,
    oldPassword,
    newPassword,
  }: UpdatePasswordRequest) {}

  async deleteUserById(id: number) {}

  async getProfile(id: number) {
    return Promise.resolve(undefined);
  }
}
