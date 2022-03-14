import template from './template';
import Block from '../../utils/Block';
import { appRouter } from '../..';

type IProps = {
  label?: string
  link?: string
  className?: string
  events?: Record<string, (event: Event) => void >
};

export default class Link extends Block {
  constructor(props: IProps) {
    super({
      className: '',
      events: {
        click: (e: Event) => this.go(e),
      },
      ...props,
    });
  }

  go(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    appRouter.go(this.props.link);
  }

  render() {
    return this.compile(template, this.props);
  }
}
