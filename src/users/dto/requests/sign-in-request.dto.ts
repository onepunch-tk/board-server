import { PickType } from '@nestjs/mapped-types';
import { UserDto } from '../user.dto';

export class SignInRequest extends PickType(UserDto, ['username'] as const) {
  password: string;
}
