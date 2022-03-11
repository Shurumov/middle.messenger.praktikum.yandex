import { User, SignupOptions } from '/src/services/api/users-api';
import { fetcher } from '/src/services/fetcher';

class AuthApi {
  signUp({
           first_name,
           second_name,
           login,
           email,
           password,
           phone,
         }: SignupOptions): Promise<{ id: number }> {
    const data = { first_name, second_name, login, email, password, phone };

    return fetcher.post('/auth/signup', {
      data,
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
    });
  }

  signIn(data: { login: string; password: string }): Promise<User> {
    return fetcher.post('/auth/signin', {
      data,
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      withCredentials: true,
    });
  }

  user(): Promise<User> {
    return fetcher.get('/auth/user', {
      withCredentials: true,
    });
  }

  logout(): Promise<void> {
    return fetcher.post('/auth/logout', {
      withCredentials: true,
    });
  }
}

export const authApi = new AuthApi();
