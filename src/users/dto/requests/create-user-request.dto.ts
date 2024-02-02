import { UserDto } from '../user.dto';
import { PickType } from '@nestjs/mapped-types';

export class CreateUserRequest extends PickType(UserDto, [
  'username',
  'nickname',
  'role',
] as const) {
  password: string;
}
