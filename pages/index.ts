import templateFunction from './index.hbs';

function render() {
  if(document?.querySelector("#root")?.innerHTML){
    document?.querySelector("#root")?.innerHTML = templateFunction();
  }
}

render();