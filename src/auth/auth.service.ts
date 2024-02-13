import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { passwordCompare } from '../utils/hash.util';
import { UserDto } from '../users/dto/user.dto';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(AuthService.name);
  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDto | null> {
    try {
      const authUser = await this.prisma.user.findUnique({
        where: { username },
      });
      if (!authUser) {
        return null;
      }

      const { success: validatePassword } = await passwordCompare(
        authUser.hash,
        password,
      );
      if (!validatePassword) {
        return null;
      }

      return authUser;
    } catch (e) {
      this.logger.error(e);
      return null;
    }
  }

  async signIn(req: FastifyRequest) {
    req.session.set('user', req['user']);
    return {
      message: 'sign-in successful',
      statusCode: HttpStatus.OK,
    };
  }
}
