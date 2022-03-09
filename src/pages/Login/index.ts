import template from './template';
import { VALIDATION_RULES } from '../../utils/validation';
import Block from '../../utils/Block';
import FormControl from '../../components/FormControl';
import Button from '../../components/Button';
import { ROUTES } from '../../utils/consts';
import Link from '../../components/Link';
import AuthController from '../../controllers/auth-controller';
import { connect } from '../../utils/Store';

class Login extends Block {
  errorText: string;

  constructor() {
    super({
      formControlLogin: new FormControl({
        label: 'логин',
        name: 'login',
        value: '',
        rule: VALIDATION_RULES.LOGIN,
      }),
      formControlPassword: new FormControl({
        label: 'пароль',
        name: 'password',
        type: 'password',
        value: '',
        rule: VALIDATION_RULES.PASSWORD,
      }),
      button: new Button({
        label: 'Вход',
        type: 'submit',
        events: { click: (event) => this.onSubmit(event) },
      }),
      registerLink: new Link({
        className: 'button button--transparent',
        label: 'Ещё не зарегистрированы?',
        link: ROUTES.REGISTER,
      }),
      errorText: '',
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    AuthController.signIn(this.children);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default connect(Login, (state) => ({
  errorText: state.error,
}));
