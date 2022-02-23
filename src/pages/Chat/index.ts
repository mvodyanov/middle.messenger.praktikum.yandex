import template from './Chat.pug';
import { VALIDATION_RULES } from '../../utils/validation';
import Block from '../../utils/Block';
import FormControl from '../../components/FormControl';
import Button from '../../components/Button';
import ChatListItem from '../../components/ChatListItem';
import Link from '../../components/Link';
import { ROUTES } from '../../utils/consts';
import ChatController from '../../controllers/chat-controller';
import { connect } from '../../utils/Store';

class Chat extends Block {
  constructor() {
    super({
      formControlMessage: new FormControl({
        name: 'message',
        placeholder: 'Сообщение...',
        className: 'chat-content-control__input',
        rule: VALIDATION_RULES.MESSAGE,
      }),
      button: new Button({
        label: 'Отправить',
        type: 'submit',
        className: 'chat-content-control__button',
        events: { click: (event) => this.onSubmit(event) },
      }),
      chatListItem: new ChatListItem({
        author: 'Андрей',
        content: 'Pug is sucks',
        timestamp: '10:45',
        count: 3,
      }),
      profileLink: new Link({
        className: 'chat-list__profile-link',
        label: 'Профиль',
        link: ROUTES.PROFILE,
      }),
      chats: '',
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    // ChatController.createChat();
  }

  componentDidMount(): void {
    ChatController.getChats();
  }
}

export default connect(Chat, (state) => ({
  errorText: state.error,
  chats: state.chats.map((chat: any) => new ChatListItem({
    author: chat.title,
    content: chat.last_message?.content,
    timestamp: chat.last_message?.time,
    count: chat.unread_count,
  })),
}));
