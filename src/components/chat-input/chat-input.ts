import * as Handlebars from 'handlebars';

import { template } from './chat-input.templ';
import './chat-input.scss';
import { ChatInputProps } from '/src/components/chat-input/chat-input.model';
import { FormField } from '/src/components/form-field/form-field';

export class ChatInput extends FormField {
  constructor(props: ChatInputProps) {
    super(props, 'div', ['chat-message']);
  }

  render(): string {
    return Handlebars.compile(template)(this.props);
  }
}
