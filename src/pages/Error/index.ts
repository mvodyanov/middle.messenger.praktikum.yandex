import template from './Error.pug';
import Block from '../../utils/Block';
import Link from '../../components/Link';
import Router from '../../utils/Router';
import store from '../../utils/Store';
import { ROUTES } from '../../utils/consts';

const getErrorText = (code: number) => {
  switch (code) {
    case 500: return 'Мы уже фиксим';
    default: return 'Не туда попали';
  }
};
export default class Error extends Block {
  constructor(code: number) {
    super({
      errorCode: code,
      errorText: getErrorText(code),
      backLink: new Link({
        className: 'button button--transparent',
        label: 'Вернуться назад',
        events: { click: (event) => this.onBack(event) },
      }),
    });
  }

  onBack(event: Event) {
    event.preventDefault();
    if (store.getState().auth.user) {
      Router.go(ROUTES.CHAT);
    } else {
      Router.go(ROUTES.HOMEPAGE);
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
