export const template = `
  <div class="container">
    <h3 class="container__title">Вход</h3>
    <form id="loginForm" class="auth-form">
      <LoginInput></LoginInput>
      <PasswordInput></PasswordInput>
      <button type="submit" class="button container__button">Авторизация</button>
    </form>
    <a class="container__link m-t-6" href="/sign-up">Нет аккаунта?</a>
  </div>
`
