import template from './template';
import Block from '../../utils/Block';
import FormControl from '../../components/FormControl';
import Button from '../../components/Button';
import { VALIDATION_RULES } from '../../utils/validation';
import Link from '../../components/Link';
import { ROUTES } from '../../utils/consts';
import AuthController from '../../controllers/auth-controller';
import { connect } from '../../utils/Store';

class Register extends Block {
  errorText: string;

  constructor() {
    super({
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
        label: 'Зарегистрироваться',
        type: 'submit',
        events: { click: (event) => this.onSubmit(event) },
      }),
      loginLink: new Link({
        className: 'button button--transparent',
        label: 'Назад',
        link: ROUTES.HOMEPAGE,
      }),
      errorText: '',
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    AuthController.signUp(this.children);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default connect(Register, (state) => ({
  errorText: state.error,
}));
