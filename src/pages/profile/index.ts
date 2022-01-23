import template from './Profile.pug';
import Block from '../../utils/Block';
import { validateFormControls } from '../../utils/events';
import FormControl from '../../components/FormControl';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import { VALIDATION_RULES } from '../../utils/validation';

export default class Profile extends Block {
  constructor() {
    super({
      avatar: new Avatar({
        name: 'avatar',
        value: 'https://i.pinimg.com/originals/69/57/2e/69572e3166e64f31fa1061bb222dc279.jpg',
      }),
      formControlEmail: new FormControl({
        name: 'email',
        label: 'Почта',
        type: 'email',
        rule: VALIDATION_RULES.EMAIL,
      }),
      formControlLogin: new FormControl({
        name: 'login',
        label: 'Логин',
        rule: VALIDATION_RULES.LOGIN,
      }),
      formControlFirstName: new FormControl({
        name: 'first_name',
        label: 'Имя',
        rule: VALIDATION_RULES.NAME,
      }),
      formControlSecondName: new FormControl({
        name: 'second_name',
        label: 'Фамилия',
        rule: VALIDATION_RULES.NAME,
      }),
      formControlDisplayName: new FormControl({
        name: 'second_name',
        label: 'Фамилия',
        rule: VALIDATION_RULES.NAME,
      }),
      formControlPhone: new FormControl({
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
        rule: VALIDATION_RULES.PHONE,
      }),
      formControlPassword: new FormControl({
        name: 'password',
        label: 'Пароль',
        type: 'password',
        rule: VALIDATION_RULES.PASSWORD,
      }),
      formControlPasswordRepeat: new FormControl({
        name: 'password_repeat',
        label: 'Пароль (ещё раз)',
        type: 'password',
        rule: VALIDATION_RULES.PASSWORD,
      }),
      button: new Button({
        label: 'Сохранить',
        type: 'submit',
        events: { click: (event: Event) => validateFormControls.call(this, event, this.children) },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
