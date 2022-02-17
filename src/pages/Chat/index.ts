import template from './Chat.pug';
import { VALIDATION_RULES } from '../../utils/validation';
import Block from '../../utils/Block';
import { validateFormControls } from '../../utils/events';
import FormControl from '../../components/FormControl';
import Button from '../../components/Button';
import ChatListItem from '../../components/ChatListItem';
import Link from '../../components/Link';
import { ROUTES } from '../../utils/consts';

export default class Chat extends Block {
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
        events: { click: (event: Event) => validateFormControls.call(this, event, this.children) },
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
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
