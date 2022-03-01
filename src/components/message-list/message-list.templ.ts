export const template = `
  <div class="chat__messages">
    {{#each messages}}
      <div class="chat__item {{#if this.isOwn}} chat__item_own{{/if}}">
        {{this.content}}
        <div class="chat__item-time">
          {{numToTime this.time}}
        </div>
      </div>
    {{/each}}
  </div>
`;
