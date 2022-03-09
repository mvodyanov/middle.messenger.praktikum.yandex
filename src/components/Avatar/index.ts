import template from './template';
import Block from '../../utils/Block';
import userController from '../../controllers/user-controller';
import { ENDPOINTS } from '../../api/endpoints';
import { connect } from '../../utils/Store';

type IProps = {
  name: string
  value?: string
  errorText?: string
  events?: Record<string, (event: InputEvent) => void>
  className?: string
  rule?: string
};
class Avatar extends Block {
  name: string;

  protected eventTarget;

  constructor(props: IProps) {
    super({
      type: 'file',
      value: '',
      className: '',
      errorText: '',
      events: {
        change: () => this.onChange(),
      },
      ...props,
    });
    this.name = props.name;
    this.eventTarget = '.avatar__input';
  }

  getValue() {
    return (this.getContent().querySelector(this.eventTarget) as HTMLInputElement).files;
  }

  onChange() {
    userController.changeUserAvatar(this.getValue());
  }

  render() {
    setTimeout(() => {
      // todo: just because pug can't render image src
      const avatarImageComponent = this.getContent().querySelector('.avatar__block');
      avatarImageComponent!.setAttribute(
        'style',
        `background-image: url(${ENDPOINTS.ROOT + ENDPOINTS.AUTH.RESOURCES}/${this.props.value})`,
      );
    });
    return this.compile(template, this.props);
  }
}

export default connect(Avatar, (state) => ({
  value: state.auth.user?.avatar,
}));
