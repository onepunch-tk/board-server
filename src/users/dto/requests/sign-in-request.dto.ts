import { PickType } from '@nestjs/mapped-types';
import { UserDto } from '../user.dto';

export class SignInRequest extends PickType(UserDto, [
  'username',
  'password',
] as const) {}
