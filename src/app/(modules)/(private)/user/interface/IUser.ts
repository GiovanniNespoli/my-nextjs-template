interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
}

interface IUserCreateData {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface IUserUpdateData {
  name: string;
  email: string;
}

export enum UserRoleEnum {
  ADMIN = "ADMIN",
  OPERATOR = "OPERATOR",
}

export type { IUser, IUserCreateData, IUserUpdateData };
