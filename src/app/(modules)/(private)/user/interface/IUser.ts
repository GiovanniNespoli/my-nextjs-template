interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface IUserCreateData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export type { IUser, IUserCreateData };
