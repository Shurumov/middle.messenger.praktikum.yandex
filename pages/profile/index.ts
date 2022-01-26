import templateFunction from './index.hbs';
import { Block } from '~utils/block';
import { renderDOM } from '~utils/render-dom';

class SignUpPage extends Block {
  constructor() {
    super();
  }

  render() {
    renderDOM("body", templateFunction({
      userInfo: [
        {key: 'Почта', value: 'example@mail.com'},
        {key: 'Логин', value: 'shurumov'},
        {key: 'Имя', value: 'Алексей'},
        {key: 'Фамилия', value: 'Шуруомв'},
        {key: 'Имя в чате', value: 'Алексей'},
        {key: 'Телефон', value: '+7 (913) 567 45-67'},
      ]
    }))
  }
}

const pageInstance = new SignUpPage();

pageInstance.render();