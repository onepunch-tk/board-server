import { PickType } from '@nestjs/mapped-types';
import { UserDto } from '../user.dto';

export class GetUserRequest extends PickType(UserDto, ['id'] as const) {}
