import * as pug from 'pug';
import { assert } from 'chai';
import templateWithProps from './templateWithProps';

const template = pug.render('button(type="{{type}}" class="{{className}}").button {{label}}');

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
