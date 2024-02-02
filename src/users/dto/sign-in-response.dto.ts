import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class SignInResponse extends PartialType(UserDto) {}
