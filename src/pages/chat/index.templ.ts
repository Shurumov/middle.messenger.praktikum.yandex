export const template = `
  <div class="chat-list">
    <a href="/profile" class="chat-list__profile">
      Профиль
    </a>
    <form id="createChatForm" class="chat-list__form">
      <ChatCreateInput></ChatCreateInput>
      <button class="chat__submit" type="submit">+</button>
    </form>
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
        <div id="deleteChat" class="chat__header-delete">Удалить чат</div>
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
