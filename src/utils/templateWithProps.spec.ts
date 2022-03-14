import { assert } from 'chai';
import templateWithProps from './templateWithProps';

const template = '<button class="{{simple}} button" type="button">{{label}}</button>';

describe('templateWithProps', () => {
  it('Pug-шаблон рендерится с пропсами', () => {
    assert.equal(
      templateWithProps(template, {
        type: 'button', className: 'simple', label: 'кнопка',
      }),
      '<button class="simple button" type="button">кнопка</button>',
    );
  });
});
