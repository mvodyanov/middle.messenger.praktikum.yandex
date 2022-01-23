import template from './ChatListItem.pug';
import Block from '../../utils/Block';

type IProps = {
  author: string
  content: string
  timestamp: string
  count?: number
};

export default class ChatListItem extends Block {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
