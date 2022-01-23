import template from './Chat.pug';
import { VALIDATION_RULES } from '../../utils/validation';
import Block from '../../utils/Block';
import { validateFormControls } from '../../utils/events';
import FormControl from '../../components/FormControl';
import Button from '../../components/Button';

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
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  // componentDidMount(): void {
  //   this.children.formControlLogin.setProps({ value: 1345 });
  // }
}
