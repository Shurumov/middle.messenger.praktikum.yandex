import { RoutePath } from '/src';
import { router } from '/src/utils/router';
import { StoreFields, storeManager } from '/src/utils/store-manager/store-manager';
import { SignupOptions } from '/src/services/api/auth-api/user.model';
import { authApi } from "./api/auth-api";

export enum ERROR_REASONS {
  UserLogged = "User already in system",
}
class AuthService {
  createNewUser(user: SignupOptions): Promise<{ id: number }> {
    return authApi.signUp(user);
  }

  signup(options: SignupOptions): void {
    this.createNewUser(options).then(() => {
      router.go(RoutePath.Chat);
    });
  }

  login(login: string, password: string): void {
    authApi
      .signIn({ login, password })
      .then(() => this.getUser())
      .then(() => router.go(RoutePath.Chat))
      .catch((err) => {
        if (err.message === ERROR_REASONS.UserLogged) {
          router.go(RoutePath.Chat);
        }
      });
  }

  logout(): Promise<void> {
    return authApi.logout().then(() => router.go(RoutePath.SignIn));
  }

  getUser(): Promise<void> {
    return authApi.user().then((data) => {
      storeManager.set(StoreFields.user, data);
    });
  }

  checkUserAuthed(): Promise<boolean> {
    return authService
      .getUser()
      .then(() => {
        if (location.pathname === RoutePath.SignUp || location.pathname === RoutePath.Login) {
          router.go(RoutePath.Chat);
        }

        return true;
      })
      .catch(() => {
        if (location.pathname !== RoutePath.SignUp && location.pathname !== RoutePath.Login) {
          router.go(RoutePath.SignIn);
        }
        return false;
      });
  }
}

export const authService = new AuthService();
