export const template = `
  <div class="chat-list__item-avatar"></div>
  <div class="chat-list__item-center">
    <div class="chat-list__item-name">{{this.title}}</div>
    <div class="chat-list__item-message">{{this.last_message.content}}</div>
  </div>
  <div class="chat-list__item-right">
    <div class="chat-list__item-time">{{numToTime this.last_message.time}}</div>
    {{#if this.unread_count}}
      <div class="chat-list__item-notion">{{this.unread_count}}</div>
    {{/if}}
  </div>
`;
