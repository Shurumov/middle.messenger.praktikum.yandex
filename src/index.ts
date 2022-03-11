import { SignInPage } from '/src/pages/sign-in';
import { SignUpPage } from '/src/pages/sign-up';
import { Router, router } from '/src/utils/router';
import { ErrorPage } from '/src/pages/404';
import { ServerErrorPage } from '/src/pages/500';
import { EditPasswordPage } from '/src/pages/edit-password';
import { EditProfilePage } from '/src/pages/edit-profile';
import { ChatPage } from '/src/pages/chat';
import { ProfilePage } from '/src/pages/profile';

export enum RoutePath {
  Chat = "/",
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  ClientError = "/404",
  ServerError = "/500",
  Profile = "/profile",
  EditPassword = "/edit-password",
  EditProfile = "/edit-profile",
}

export interface Route {
  path: string;
  component: any;
  props?: Record<string, any>
}

export const routes:Route[] = [
  {
    path: RoutePath.Chat,
    component: ChatPage
  },
  {
    path: RoutePath.SignIn,
    component: SignInPage
  },
  {
    path: RoutePath.SignUp,
    component: SignUpPage
  },
  {
    path: RoutePath.ClientError,
    component: ErrorPage
  },
  {
    path: RoutePath.ServerError,
    component: ServerErrorPage
  },
  {
    path: RoutePath.Profile,
    component: ProfilePage
  },
  {
    path: RoutePath.EditPassword,
    component: EditPasswordPage
  },
  {
    path: RoutePath.EditProfile,
    component: EditProfilePage
  },
]

export function useRoutes(routes: Route[]): Router {
  return routes.reduce((acc, { path, component, props }) => acc.use(path, component, props), router);
}

useRoutes(routes).start();
