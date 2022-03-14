import template from './template';
import Block from '../../utils/Block';
import { MessageResponse } from '../../types/types';
import store from '../../utils/Store';

type IProps = MessageResponse;

export default class Message extends Block {
  constructor(props: IProps) {
    super({
      ...props,
      type: store.getState().auth.user?.id === props.user_id ? 'message--out' : 'message--in',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
