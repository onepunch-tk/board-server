import { ResponseDto } from '../../../common/responses/response.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UserResponse extends PartialType(ResponseDto) {}
