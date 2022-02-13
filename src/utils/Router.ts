import Block from './Block';
import { ROUTES } from './consts';
import Route from './Route';

export default class Router {
  static __instance: any;

  routes: Route[];

  history: History;

  _currentRoute: null | Route;

  _rootQuery: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event) => {
      const { hash, pathname } = (event.currentTarget as Window).location;
      this._onRoute(pathname + hash);
    });

    const { hash, pathname } = window.location;
    this._onRoute(pathname + hash);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    let route = this.routes.find((r: Route) => r.match(pathname));
    if (!route) {
      route = this.routes.find((r: Route) => r.match(ROUTES.ERROR[404]));
    }
    return route;
  }
}
