import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserRequest } from './dto/requests/create-user-request.dto';
import { SignInRequest } from './dto/requests/sign-in-request.dto';
import { UpdatePasswordRequest } from './dto/requests/update-password-request.dto';
import { UserDto } from './dto/user.dto';
import { CreateUserResponse } from './dto/responses/create-user-response.dto';
import { passwordCompare, passwordHashing } from '../utils/hash.util';
import { PrismaService } from '../prisma/prisma.service';
import { GetProfileResponse } from './dto/responses/get-profile-response.dto';
import { UserResponse } from './dto/responses/user-response.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    createUserRequest: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    try {
      const duplicated = await this.isDuplicatedUserByUsername(
        createUserRequest.username,
      );
      if (duplicated) {
        this.logger.error('이미 존재하는 ID');
        throw new Error('이미 존재하는 ID 입니다.');
      }

      const { success, hash } = await passwordHashing(
        createUserRequest.password,
      );
      if (!success) {
        this.logger.error('아이디 생성에 실패.(hash 실패)');
        throw new Error('아이디 생성에 실패.');
      }

      delete createUserRequest.password;

      const createdUser = await this.prisma.user.create({
        data: {
          hash,
          ...createUserRequest,
        },
      });

      this.logger.log(`아이디 생성 성공! ${this.createUser.name}`);

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
  async signIn(signInRequest: SignInRequest): Promise<UserDto> {
    throw new Error();
  }

  async updatePassword({
    id,
    oldPassword,
    newPassword,
  }: UpdatePasswordRequest): Promise<UserResponse> {
    try {
      const findUser = await this.getUserById(id);
      if (!findUser) {
        throw new NotFoundException('Not found User.');
      }

      const { success: validPassword } = await passwordCompare(
        findUser.hash,
        oldPassword,
      );
      if (!validPassword) {
        throw new UnauthorizedException(
          'incorrect password. please try again.',
        );
      }

      const { success: samePassword } = await passwordCompare(
        findUser.hash,
        newPassword,
      );
      if (samePassword) {
        throw new BadRequestException('Same as existing password');
      }

      const { success, hash } = await passwordHashing(newPassword);

      if (!success) {
        throw new Error('Failure password hashing.');
      }

      await this.prisma.user.update({
        where: { id: findUser.id },
        data: {
          hash,
        },
      });

      return {
        success: true,
      };
    } catch (e) {
      return {
        success: false,
        error: e.message,
      };
    }
  }

  async deleteUserById(userId: number): Promise<UserResponse> {
    try {
      const findUser = await this.getUserById(userId);
      if (!findUser) {
        throw new NotFoundException('Not found User.');
      }

      await this.prisma.user.delete({ where: { id: findUser.id } });

      return {
        success: true,
      };
    } catch (e) {
      return {
        success: false,
        error: e.message,
      };
    }
  }

  async getProfile(userId: number): Promise<GetProfileResponse> {
    try {
      const findUser = await this.getUserById(userId);
      if (!findUser) {
        throw new NotFoundException('Not found User.');
      }
      return {
        success: true,
        user: findUser,
      };
    } catch (e) {
      return {
        success: false,
        error: e.message,
      };
    }
  }

  private async getUserById(id: number): Promise<UserDto | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  private async isDuplicatedUserByUsername(username: string): Promise<boolean> {
    try {
      const findUser = await this.prisma.user.findUnique({
        where: { username },
      });
      return !!findUser;
    } catch (e) {
      return true;
    }
  }
}
