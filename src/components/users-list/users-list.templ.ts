export const template = `
  {{#each users}}
    <div class="users-list__item">
      {{this.first_name}} {{this.second_name}}
    </div>
  {{/each}}
`
