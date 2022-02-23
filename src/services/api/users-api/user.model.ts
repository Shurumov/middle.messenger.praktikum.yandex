export interface UserBase {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface SignupOptions extends UserBase {
  password: string;
}

export interface User extends UserBase {
  avatar: string;
  display_name: string;
  id: number
}

export type UserInfo = Omit<User, "id" | "avatar">;
