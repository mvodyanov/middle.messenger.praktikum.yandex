import template from './template';
import Block from '../../utils/Block';
import FormControl from '../../components/FormControl';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import { VALIDATION_RULES } from '../../utils/validation';
import { ROUTES } from '../../utils/consts';
import Link from '../../components/Link';
import AuthController from '../../controllers/auth-controller';
import store, { connect } from '../../utils/Store';
import UserController from '../../controllers/user-controller';
import { UserResponse } from '../../types/types';

class Profile extends Block {
  constructor() {
    super({
      avatar: new Avatar({
        name: 'avatar',
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
        name: 'display_name',
        label: 'Отображаемое имя',
        rule: VALIDATION_RULES.NAME,
      }),
      formControlPhone: new FormControl({
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
        rule: VALIDATION_RULES.PHONE,
      }),
      formControlOldPassword: new FormControl({
        name: 'oldPassword',
        label: 'Старый пароль',
        type: 'text',
        placeholder: '***',
        rule: VALIDATION_RULES.PASSWORD,
      }),
      formControlNewPassword: new FormControl({
        name: 'newPassword',
        label: 'Новый пароль',
        type: 'text',
        placeholder: '***',
        rule: VALIDATION_RULES.PASSWORD,
      }),
      button: new Button({
        label: 'Сохранить',
        type: 'submit',
        events: { click: (event) => this.onSubmit(event) },
      }),
      chatLink: new Link({
        className: 'profile__back-link',
        label: 'Назад',
        link: ROUTES.CHAT,
      }),
      logoutLink: new Link({
        className: 'profile__logout-link',
        label: 'Выход',
        events: { click: (event) => this.onLogout(event) },
      }),

      errorText: '',
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    UserController.changeUser(this.children);
  }

  onLogout(event: Event) {
    event.preventDefault();
    AuthController.logout();
  }

  render() {
    return this.compile(template, this.props);
  }

  componentDidMount(): void {
    const { user } = store.getState().auth;
    if (user) {
      Object.entries(this.children)
        .filter(([, children]) => children instanceof FormControl || children instanceof Avatar)
        .forEach(([key, children]: [string, { name : keyof UserResponse }]) => {
          this.children[key].setProps({ value: user[children.name] || '' });
        });
    }
  }
}

export default connect(Profile, (state) => ({
  errorText: state.error,
  user: state.auth.user,
}));
