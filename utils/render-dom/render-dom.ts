export const renderDOM = (query: string, template: string) => {
  const root = document.querySelector(query);

  if(root) {
    root.innerHTML = template
  }

  return root;
}