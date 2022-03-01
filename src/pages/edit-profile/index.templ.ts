export const template = `
  <div class="container">
    <h3 class="container__title">Редактирование профиля</h3>
    <form id="editUserProfileForm" class="edit-profile-form">
      <EmailInput></EmailInput>
      <LoginInput></LoginInput>
      <FirstNameInput></FirstNameInput>
      <SecondNameInput></SecondNameInput>
      <DisplayNameInput></DisplayNameInput>
      <PhoneInput></PhoneInput>
      <button type="submit" class="button container__button">Сохранить</button>
    </form>
    <a class="container__link m-t-6" href="/profile">К профилю</a>
  </div>
`;
