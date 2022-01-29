import { template } from './index.templ';
import * as Handlebars from 'handlebars';
import Block from '~src/utils/block/block';
import './profile.scss';
import '~src/styles/default.scss'

class ProfilePage extends Block {
  constructor() {
    super({
      userInfo: [
        { key: 'Почта', value: 'example@mail.com' },
        { key: 'Логин', value: 'shurumov' },
        { key: 'Имя', value: 'Алексей' },
        { key: 'Фамилия', value: 'Шуруомв' },
        { key: 'Имя в чате', value: 'Алексей' },
        { key: 'Телефон', value: '+7 (913) 567 45-67' },
      ]
    }, 'div', ['flex']);
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}

const page = new ProfilePage();
const root = document.getElementById('root');
root?.appendChild(page.getContent());


// import templateFunction from './index.hbs';
// import { Block } from '~utils/block';
// import { renderDOM } from '~utils/render-dom';
//
// class SignUpPage extends Block {
//   constructor() {
//     super();
//   }
//
//   render() {
//     renderDOM("body", templateFunction({
//       userInfo: [
//         {key: 'Почта', value: 'example@mail.com'},
//         {key: 'Логин', value: 'shurumov'},
//         {key: 'Имя', value: 'Алексей'},
//         {key: 'Фамилия', value: 'Шуруомв'},
//         {key: 'Имя в чате', value: 'Алексей'},
//         {key: 'Телефон', value: '+7 (913) 567 45-67'},
//       ]
//     }))
//   }
// }
//
// const pageInstance = new SignUpPage();
//
// pageInstance.render();