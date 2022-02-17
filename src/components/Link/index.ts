import template from './Link.pug';
import Block from '../../utils/Block';
import { router } from '../..';

type IProps = {
  label: string
  link?: string
  className?: string
};

export default class Link extends Block {
  constructor(props: IProps) {
    super({
      link: '#',
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
    router.go(this.props.link);
  }

  render() {
    return this.compile(template, this.props);
  }
}
