interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface IUserCreateData {
  name: string;
  email: string;
  phone: string;
}

export type { IUser, IUserCreateData };
