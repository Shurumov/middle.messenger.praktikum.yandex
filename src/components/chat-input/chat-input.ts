import * as Handlebars from 'handlebars';

import { template } from './chat-input.templ';
import Block from '/src/utils/block/block';
import './chat-input.scss';
import { helpers } from '/src/utils/helpers';
import { getInputValidatorMethod } from '/src/utils/validation/input-validation';
import { ChatInputProps } from '/src/components/chat-input/chat-input.model';

export class ChatInput extends Block {
  constructor(props: ChatInputProps) {
    if (props.validators && !helpers.isEmpty(props.validators)) {
      props.events = props.events ?? {};
      const validationMethod = getInputValidatorMethod(props.validators);
      const handleEvent = (event: FocusEvent) => validationMethod(event.target);
      props.events.input = {
        ...props.events.input,
        focus: handleEvent,
        blur: handleEvent,
      };
    }

    super(props, 'div', ['chat-message']);
  }

  render(): string {
    return Handlebars.compile(template)(this.props);
  }

  validateInput(): boolean {
    const input = this.getBlock().getElementsByTagName('input')[0];
    const validationMethod = getInputValidatorMethod(this.props.validators);

    return validationMethod(input);
  }
}
