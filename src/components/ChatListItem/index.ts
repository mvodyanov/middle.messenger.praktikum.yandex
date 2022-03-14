import template from './template';
import Block from '../../utils/Block';
import { appRouter } from '../..';
import { ROUTES } from '../../utils/consts';
import { getTimestampTime } from '../../utils';

type IProps = {
  chatId: number
  author: string
  content: string
  timestamp: string
  count: string
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
    appRouter.go(`${ROUTES.CHAT}?chatId=${this.props.chatId}`);
  }

  render() {
    this.props.timestamp = getTimestampTime(this.props.timestamp);
    return this.compile(template, this.props);
  }
}
