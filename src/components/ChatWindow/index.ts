import template from './template';
import Block from '../../utils/Block';
import { connect } from '../../utils/Store';
import Button from '../Button';
import ChatController from '../../controllers/chat-controller';
import FormControl from '../FormControl';
import Message from '../Message';

type IProps = any;

class ChatWindow extends Block {
  constructor(props: IProps) {
    super({
      ...props,
      userAddInput: new FormControl({
        name: 'add_user',
        placeholder: 'добавить нового юзера(id) в чат',
        className: 'chat-window-add__input',
      }),
      userAddButton: new Button({
        label: '+',
        className: 'chat-window-add__button',
        events: { click: (event) => this.onAddUser(event) },
      }),
      chatAddInput: new FormControl({
        name: 'add_user',
        placeholder: 'Название нового чата',
        className: 'chat-window-add__input',
      }),
      chatAddButton: new Button({
        label: '+',
        className: 'chat-window-add__button',
        events: { click: (event) => this.onAddChat(event) },
      }),

    });
  }

  onAddUser(event: Event) {
    event.preventDefault();
    const userId = this.children.userAddInput.getValue();
    ChatController.addChatUsers([userId]);
  }

  onAddChat(event: Event) {
    event.preventDefault();
    const chatTitle = this.children.chatAddInput.getValue();
    ChatController.createChat(chatTitle);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default connect(ChatWindow, (state) => ({
  errorText: state.error,
  userList: state.chat.current?.userList.map((user) => new Button({
    label: user.login,
    className: `chat-window__user-button ${state.auth.user?.id === user.id && 'is-disabled'}`,
    events: { click: () => ChatController.deleteChatUsers([user.id]) },
  })) || null,
  noCurrentChat: state.chat.current == null && 'is-no-current-chat',
  messageList: state.chat.current?.messageList?.map((message) => new Message(message)) || null,
}));
