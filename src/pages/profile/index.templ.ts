export const template = `
<div class="profile">
  <div class="profile__image">
    <img src="./placeholder.png" alt="">
    <div class="profile-change">Поменять<br>аватар</div>
  </div>
  <div class="profile__name m-t-5">
    Алексей
  </div>
  <div class="text-list m-t-12">
    {{#each userInfo}}
      <div class="text-list__item">
        <div class="text-list__item-key">
          {{this.label}}
        </div>
        <div class="text-list__item-value">
          {{this.value}}
        </div>
      </div>
    {{/each}}
  </div>
  <div class="text-list m-t-10">
      <div class="text-list__item">
        <a href="/edit-profile">Изменить данные</a>
      </div>
      <div class="text-list__item">
        <a href="/edit-password">Изменить пароль</a>
      </div>
      <div id="logout" class="text-list__item text-list__item_exit">
        <a>Выйти</a>
      </div>
    </div>
</div>
`;
