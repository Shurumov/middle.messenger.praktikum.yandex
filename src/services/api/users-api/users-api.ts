import { User } from './user.model';
import { fetcher } from '/src/services/fetcher';

type ChangeProfileOptions = Omit<User, "id" | "avatar">;

class UsersApi {
  changeProfile(data: ChangeProfileOptions): Promise<User> {
    return fetcher.put("/user/profile", {
      data,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  changePassword(oldPassword: string, newPassword: string): Promise<void> {
    return fetcher.put("/user/password", {
      data: {
        oldPassword,
        newPassword,
      },
      headers: {
        "content-type": "application/json",
      },
    });
  }

  changeProfileAvatar(data: FormData): Promise<User> {
    return fetcher.put("/user/profile/avatar", {
      data,
      file: true,
    });
  }

  getUser(id: number): Promise<User> {
    return fetcher.post(`/user/${id}`, {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  searchUsers(login: string): Promise<User[]> {
    return fetcher.post("/user/search", {
      data: { login },
      headers: {
        "content-type": "application/json",
      },
    });
  }
}

export const usersApi = new UsersApi();
