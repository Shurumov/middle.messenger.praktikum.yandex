export const template = `
  <div class="chat-list">
    <a href="/profile" class="chat-list__profile">
      Профиль
    </a>
    <input placeholder="Поиск" class="chat-list__search"/>
    <div class="chat-list__items">
      <div class="chat-list__item">
        <div class="chat-list__item-avatar"></div>
        <div class="chat-list__item-center">
          <div class="chat-list__item-name">Вася</div>
          <div class="chat-list__item-message">Друзья, у меня для вас особенный выпуск новостей!...</div>
        </div>
        <div class="chat-list__item-right">
          <div class="chat-list__item-time">10:12</div>
          <div class="chat-list__item-notion">1</div>
        </div>
      </div>
      <div class="chat-list__item">
        <div class="chat-list__item-avatar"></div>
        <div class="chat-list__item-center">
          <div class="chat-list__item-name">Вася</div>
          <div class="chat-list__item-message">Друзья, у меня для вас особенный выпуск новостей!...</div>
        </div>
        <div class="chat-list__item-right">
          <div class="chat-list__item-time">10:12</div>
          <div class="chat-list__item-notion">1</div>
        </div>
      </div>
    </div>
  </div>
  <div class="chat">
    <div class="chat__header">
      <div class="chat__header-avatar">
      </div>
      <div class="chat__header-name">Иван</div>
    </div>
    <div class="chat__messages">
      <div class="chat__date">25 января</div>
      <div class="chat__item">
        Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила
        Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500
        EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой
        забрали только кассеты с пленкой.
        <div class="chat__item-time">
          11:56
        </div>
      </div>

      <div class="chat__item chat__item_own">
        Круто
        <div class="chat__item-time chat__item-time_own">
          12:30
        </div>
      </div>
    </div>
    <form class="chat__form">
      <InputMessage></InputMessage>
      <button class="chat__submit" type="submit">&#8594;</button>
    </form>
  </div>
`
