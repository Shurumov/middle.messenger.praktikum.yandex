export const sendFormHandler = (index: number) => (e: Event) => {
  e.preventDefault();
  const form = document.forms[index]
  const res = {};
  for(let i = 0; i <= form.length - 2; i++) {
    res[form[i].name]= form[i].value
  }
  console.log(res)
}