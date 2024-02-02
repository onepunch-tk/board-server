import { PartialType } from '@nestjs/mapped-types/dist/partial-type.helper';
import { ResponseDto } from '../../../common/responses/response.dto';
import { UserDto } from '../user.dto';

export class CreateUserResponse extends PartialType(ResponseDto) {
  user?: Omit<UserDto, 'password'>;
}
