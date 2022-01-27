import templateFunction from './index.hbs';
import { Block } from '~utils/block';

export class Button extends Block {

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return () => templateFunction(this.props)
  }

}
