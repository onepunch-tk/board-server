import { EUserStatus } from '../constants/user-status.enum';

export class UserDto {
  id: number;
  username: string;
  password: string;
  nickname: string;
  isAdmin: boolean;
  status: EUserStatus;
  createdAt: Date;
  updatedAt: Date;
}
