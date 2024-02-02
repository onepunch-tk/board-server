import { PickType } from '@nestjs/mapped-types';
import { UserDto } from '../user.dto';

export class UpdatePasswordRequest extends PickType(UserDto, ['id']) {
  newPassword: string;
  oldPassword: string;
}
