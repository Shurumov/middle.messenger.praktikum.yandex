export const template = `
  <form id="searchUsersForm">
    <SearchUsers></SearchUsers>
    <button class="users-list__submit" type="submit"></button>
  </form>

  {{#each users}}
    <{{this}}> </{{this}}>
  {{/each}}
`
