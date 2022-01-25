import templateFunction from './chat.hbs';

function render() {
  if(document.querySelector("#root")){
    document.querySelector('#root').innerHTML = templateFunction({});
  }
}

render();