import authController from '../controllers/auth-controller';
import { AConstructorTypeOf } from '../types/types';
import Block from './Block';
import { ROUTES } from './consts';
import EventBus from './EventBus';
import Route from './Route';

export enum RouterEvents {
  UPDATED = 'updated',
}

class Router extends EventBus {
  static __instance: any;

  env: any;

  routes: Route[];

  history: History;

  _currentRoute: null | Route;

  _rootQuery: string;

  constructor(rootQuery: string, env: any) {
    super();
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.env = env;
    this.routes = [];
    this.history = env.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: AConstructorTypeOf<Block>, hasAccess?: () => boolean) {
    const route = new Route(
      pathname,
      block,
      { rootQuery: this._rootQuery, hasAccess },
    );

    this.routes.push(route);

    return this;
  }

  async initUser() {
    await authController.initUser();
  }

  start() {
    this.env.onpopstate = (() => this._onRoute());
    this._onRoute();
  }

  _onRoute() {
    const route = this.getRoute(this.env.location.pathname);
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
    this._onRoute();
    this.emit(RouterEvents.UPDATED);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    let route = this.routes.find((r: Route) => r.match(pathname));
    if (!route || (route.hasAccess && !route.hasAccess())) {
      route = this.routes.find((r: Route) => r.match(ROUTES.ERROR[404]));
    }
    return route;
  }
}

export default Router;
