export const template = `
    <input
        id="message"
        class="chat-message__input {{#if errorText}} invalid {{/if}}"
        name="{{name}}"
        placeholder="{{placeholder}}"
        type="text"
        value="{{value}}"
        autocomplete="off"
    />
`;
