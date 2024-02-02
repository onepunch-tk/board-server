import { PickType } from '@nestjs/mapped-types';
import { UserDto } from '../user.dto';

export class DeleteUserRequest extends PickType(UserDto, [
  'id',
  'password',
] as const) {}
