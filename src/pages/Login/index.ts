import template from './Login.pug';
import { VALIDATION_RULES } from '../../utils/validation';
import Block from '../../utils/Block';
import { validateFormControls } from '../../utils/events';
import FormControl from '../../components/FormControl';
import Button from '../../components/Button';
import { ROUTES } from '../../utils/consts';
import Link from '../../components/Link';

class Login extends Block {
  constructor() {
    super({
      formControlLogin: new FormControl({
        label: 'логин',
        name: 'login',
        rule: VALIDATION_RULES.LOGIN,
      }),
      formControlPassword: new FormControl({
        label: 'пароль',
        name: 'password',
        type: 'password',
        rule: VALIDATION_RULES.PASSWORD,
      }),
      button: new Button({
        label: 'Вход',
        type: 'submit',
        events: { click: (event: Event) => validateFormControls.call(this, event, this.children) },
      }),
      registerLink: new Link({
        className: 'button button--transparent',
        label: 'Ещё не зарегистрированы?',
        link: ROUTES.REGISTER,
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Login;
