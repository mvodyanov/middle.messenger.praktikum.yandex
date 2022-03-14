import template from './template';
import { validate } from '../../utils/validation';
import Block from '../../utils/Block';
import { sanitizeHTML } from '../../utils';

type IProps = {
  name: string
  type?: string
  label?: string
  value?: string
  errorText?: string
  events?: Record<string, (event: InputEvent) => void>
  className?: string
  placeholder?: string
  rule?: string
};
export default class FormControl extends Block {
  name: string;

  protected eventTarget;

  constructor(props: IProps) {
    super({
      type: 'text',
      value: '',
      label: '',
      className: '',
      errorText: '',
      placeholder: '',
      events: {
        blur: () => this.validate(),
      },
      ...props,
    });
    this.name = props.name;
    this.eventTarget = '.form-control__input';
  }

  validate() {
    try {
      validate(this.getValue(), this.props.rule);
      this.setProps({
        errorText: '',
        value: this.getValue(),
      });
      return true;
    } catch (error) {
      this.setProps({
        errorText: (error as Error).message,
        value: this.getValue(),
      });
      return false;
    }
  }

  getValue() {
    return sanitizeHTML(
      (this.getContent().querySelector(this.eventTarget) as HTMLInputElement).value,
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
