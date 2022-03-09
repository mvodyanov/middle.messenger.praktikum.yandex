// eslint-disable-next-line max-classes-per-file
import { assert } from 'chai';
import { JSDOM } from 'jsdom';
import Block from './Block';
import { ROUTES } from './consts';
import Router from './router';

class TestComponent extends Block {
  constructor() {
    super({ name: 'TestComponent' });
  }
}

class ErrorComponent extends Block {
  constructor() {
    super({ name: 'ErrorComponent' });
  }
}

const dom = new JSDOM(
  `<html>
        <body>
          <div id="app"></div>
        </body>
      </html>`,
  { url: 'http://localhost:3000/' },
);
(global as any).window = dom.window;

const router = new Router('#app', window);

describe('Router', () => {
  it('Роутер создается', () => {
    assert.exists(router);
  });

  it('Роуты регистрируются', () => {
    router
      .use(ROUTES.HOMEPAGE, TestComponent)
      .use(ROUTES.ERROR[404], ErrorComponent);
    assert.lengthOf(router.routes, 2);
  });

  it('По запросу находит роут', () => {
    router.go(ROUTES.HOMEPAGE);
    // @ts-ignore
    assert.equal(router._currentRoute?._block.props.name, 'TestComponent');
  });

  it('Если запрошен роут, которого нет - то выдаётся роут показывающий страницу ошибки', () => {
    router.go('/whatever');
    // @ts-ignore
    assert.equal(router._currentRoute?._block.props.name, 'ErrorComponent');
  });
});
