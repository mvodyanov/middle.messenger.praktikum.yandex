import { assert } from 'chai';
import templateWithProps from './templateWithProps';

const template = 'button(type="{{type}}" class="{{className}}").button {{label}}';

describe('templateWithProps', () => {
  it('Pug-шаблон рендерится с пропсами', () => {
    assert.equal(
      templateWithProps(template, {
        type: 'button', className: 'simple', label: 'кнопка',
      }),
      'button(type="button" class="simple").button кнопка',
    );
  });
});
