/* eslint-disable max-classes-per-file */
import template from './Error.pug';
import Block from '../../utils/Block';
import Link from '../../components/Link';
import { router } from '../..';
import store from '../../utils/Store';
import { ROUTES } from '../../utils/consts';

const getErrorText = (code: number) => {
  switch (code) {
    case 500: return 'Мы уже фиксим';
    default: return 'Не туда попали';
  }
};

class Error extends Block {
  constructor(props: {
    errorCode: number
    errorText: string
  }) {
    super({
      ...props,
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
      router.go(ROUTES.CHAT);
    } else {
      router.go(ROUTES.HOMEPAGE);
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

export class Error404 extends Error {
  constructor() {
    super({
      errorCode: 404,
      errorText: getErrorText(404),
    });
  }
}

export class Error500 extends Error {
  constructor() {
    super({
      errorCode: 500,
      errorText: getErrorText(500),
    });
  }
}
