import template from './Error.pug';
import Block from '../../utils/Block';

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
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
