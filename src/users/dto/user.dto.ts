import { USER_ROLE } from '@prisma/client';

export class UserDto {
  id: number;
  username: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
  role: USER_ROLE;
  hash: string;
}
