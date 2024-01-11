import {UserTypeEnum} from './user-type.enum';

export type User = {
  name: string;
  email: string;
  avatarPath?: string;
  password: string;
  userType: UserTypeEnum;
}
