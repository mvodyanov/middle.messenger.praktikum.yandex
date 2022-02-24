import template from './Chat.pug';
import { VALIDATION_RULES } from '../../utils/validation';
import Block from '../../utils/Block';
import FormControl from '../../components/FormControl';
import Button from '../../components/Button';
import ChatListItem from '../../components/ChatListItem';
import Link from '../../components/Link';
import { ROUTES } from '../../utils/consts';
import ChatController from '../../controllers/chat-controller';
import store, { connect } from '../../utils/Store';
import ChatWindow from '../../components/ChatWindow';
import Router, { RouterEvents } from '../../utils/Router';

class Chat extends Block {
  socket?: WebSocket;

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
      profileLink: new Link({
        className: 'chat-list__profile-link',
        label: 'Профиль',
        link: ROUTES.PROFILE,
      }),
      chatList: '',
      chatWindow: new ChatWindow(),
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.socket) {
      this.socket.send(JSON.stringify({
        content: this.children.formControlMessage.getValue(),
        type: 'message',
      }));
    }
  }

  async onRouteHandler() {
    const searchParams = (new URL(window.location.href)).searchParams.get('chatId');
    if (searchParams) {
      const chatId = parseFloat(searchParams);
      const userId = store.getState().auth.user?.id!;
      await ChatController.getChatData(chatId);

      const token = store.getState().chat.current?.token!;
      this.socket = ChatController.initSocket(userId, chatId, token);
    }
  }

  async componentDidMount() {
    await ChatController.getChatList();
    Router.on(RouterEvents.UPDATED, () => this.onRouteHandler());
    this.onRouteHandler();
  }

  componentWillUnmount() {
    ChatController.clearCurrentChat();
  }
}

export default connect(Chat, (state) => ({
  errorText: state.error,
  chatList: state.chat.list?.map((chat: any) => new ChatListItem({
    chatId: chat.id,
    author: chat.title,
    content: chat.last_message?.content,
    timestamp: chat.last_message?.time,
    count: chat.unread_count,
  })) || '',
}));
