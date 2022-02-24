import template from './ChatListItem.pug';
import Block from '../../utils/Block';
import Router from '../../utils/Router';
import { ROUTES } from '../../utils/consts';

type IProps = {
  chatId: string
  author: string
  content: string
  timestamp: string
  count?: number
};

export default class ChatListItem extends Block {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => this.go(e),
      },
    });
  }

  go(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    Router.go(`${ROUTES.CHAT}?chatId=${this.props.chatId}`);
  }

  render() {
    return this.compile(template, this.props);
  }
}
