import template from './Avatar.pug';
import Block from '../../utils/Block';

type IProps = {
  name: string
  value?: string
  errorText?: string
  events?: Record<string, (event: InputEvent) => void>
  className?: string
  rule?: string
};
export default class Avatar extends Block {
  name: string;

  protected eventTarget;

  constructor(props: IProps) {
    super({
      type: 'file',
      value: '',
      className: '',
      errorText: '',
      ...props,
    });
    this.name = props.name;
    this.eventTarget = '.avatar__input';
  }

  getValue() {
    return (this.getContent().querySelector(this.eventTarget) as HTMLInputElement).value;
  }

  render() {
    setTimeout(() => {
      // todo: just because pug can't render image src
      const avatarImageComponent = this.getContent().querySelector('.avatar__image');
      avatarImageComponent!.setAttribute('src', this.props.value);
    });
    return this.compile(template, this.props);
  }
}
