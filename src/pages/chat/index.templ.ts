export const template = `
  <div class="chat-list">
    <a href="/profile" class="chat-list__profile">
      Профиль
    </a>
    <input placeholder="Поиск" class="chat-list__search"/>
    <div class="chat-list__items">
      {{#each chats}}
        <{{this}}> </{{this}}>
      {{/each}}
    </div>
  </div>
  <div class="chat">
    {{#if this.currentChat}}
      <div class="chat__header">
        <div class="chat__header-avatar">
        </div>
        <div class="chat__header-name">{{this.currentChat.title}}</div>
        <div id="toggleUsers" class="chat__header-edit">Редактировать</div>
      </div>
      <MessageList></MessageList>
      <UsersList></UsersList>

      <form id="sendMessageForm" class="chat__form">
        <ChatInput></ChatInput>
        <button class="chat__submit" type="submit">&#8594;</button>
      </form>
    {{/if}}
  </div>
`;
