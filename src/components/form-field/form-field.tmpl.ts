export const formFieldTmpl = `
    <input
        class="form-field__input {{#if errorText}} invalid {{/if}}"
        name="{{name}}"
        placeholder="{{placeholder}}"
        type="{{#if type}}{{type}}{{else}}text{{/if}}"
        value="{{value}}"
        autocomplete
    />
    <div class="form-field__error">
      {{errorText}}
    <div>
`;
