import { template } from './index.templ';
import * as Handlebars from "handlebars";
import Block from '/src/utils/block/block';
import './styles.scss'
import { InputValidatorName } from '/src/utils/validation/input-validation';
import { ChatInput } from '/src/components/chat-input/chat-input';
import { setFormValidation } from '/src/utils/validation/form-validation';
import '/src/styles/default.scss'

export class ChatPage extends Block {
  constructor() {
    super({
      children: {
        InputMessage: new ChatInput({
          label: 'Имя',
          placeholder: 'Сообщение',
          name: 'message',
          replaceClassList: true,
          validators: {
            [InputValidatorName.required]: null,
          },
        }),
      },
      formFields: ["InputMessage"],
      events: setFormValidation(),
    },'div', ['chat-page']);
  }
  render() {
    return Handlebars.compile(template)(this.props);
  }
}
