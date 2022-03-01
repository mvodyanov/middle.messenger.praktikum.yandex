import template from './Button.pug';
import Block from '../../utils/Block';

type IProps = {
  label: string
  type?: string
  className?: string
  events?: Record<string, (event: InputEvent) => void >
};

export default class Button extends Block {
  constructor(props: IProps) {
    super({
      type: 'button',
      className: '',
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
