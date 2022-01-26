export function renderDOM(query: string, block) {
  const root = document.querySelector(query);

  // Можно завязаться на реализации вашего класса Block
  if(root) {
    root.appendChild(block.getContent());
    block.dispatchComponentDidMount();
  }

  return root;
}