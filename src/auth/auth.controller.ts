import { Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { FastifyRequest } from 'fastify';
import { AuthenticatedGuard } from './authenticated.guard';
import * as secureSession from '@fastify/secure-session';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(
    @Req() req: FastifyRequest,
    @Session() session: secureSession.Session,
  ) {
    session.touch();
    session.data();
    return this.authService.signIn(req);
  }

  @Get('sign-out')
  async signOut(@Req() req: FastifyRequest) {
    req.session.delete();
  }

  @UseGuards(AuthenticatedGuard)
  @Get('test')
  async test(@Req() req: FastifyRequest) {
    const user = req.session.get('user');
    return user;
  }
}
