import template from './Error.pug';
import Block from '../../utils/Block';
import Link from '../../components/Link';
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
        label: 'Назад к чатам',
        link: ROUTES.HOMEPAGE,
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
