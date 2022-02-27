import * as pug from 'pug';
import { assert } from 'chai';
import Block from './Block';

const template = pug.render('button(type="button").button {{label}}');

class Button extends Block {
  constructor(props: {
    label: string;
    events?: Record<string, (event: InputEvent) => void>;
  }) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

describe('Block', () => {
  it('Экземпляр Блока с пропсами рендерится', () => {
    const button = new Button({
      label: 'Кнопка',
    });
    button.render();
    assert.equal(
      button.getContent().outerHTML,
      '<button class="button" type="button">Кнопка</button>',
    );
  });

  it('Экземпляр Блока с евентами', () => {
    let button: Block;
    const handleEvent = () => {
      button.setProps({ label: 'Нажать' });
    };
    button = new Button({
      label: 'Кнопка',
      events: {
        click: () => handleEvent(),
      },
    });
    button.render();
    button.getContent().click();
    assert.equal(
      button.getContent().outerHTML,
      '<button class="button" type="button">Нажать</button>',
    );
  });
});
