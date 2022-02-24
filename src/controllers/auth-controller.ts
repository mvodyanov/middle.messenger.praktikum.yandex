import AuthAPI from '../api/auth-api';
import { Children } from '../types/types';
import { ROUTES } from '../utils/consts';
import { validateFormControls } from '../utils/events';
import Router from '../utils/Router';
import Store from '../utils/Store';

const authAPI = new AuthAPI();

class AuthController {
  public async signUp(children: Children) {
    try {
      Store.set('error', '');
      const formData = validateFormControls(children);
      await authAPI.signUp(formData);
      const user = await authAPI.getUser();
      Store.set('auth.user', JSON.parse(user.response));
      Router.go(ROUTES.CHAT);
    } catch (error) {
      Store.set('error', error.reason || '');
    }
  }

  public async signIn(children: Children) {
    try {
      Store.set('error', '');
      const formData = validateFormControls(children);
      await authAPI.signIn(formData);
      const user = await authAPI.getUser();
      Store.set('auth.user', JSON.parse(user.response));
      Router.go(ROUTES.CHAT);
    } catch (error) {
      Store.set('error', error.reason || '');
    }
  }

  public async initUser() {
    try {
      const user = await authAPI.getUser();
      Store.set('auth.user', JSON.parse(user.response));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.info(`initUser error:${error.reason || error}`);
    }
  }

  public async getUser() {
    try {
      Store.set('error', '');
      const user = await authAPI.getUser();
      Store.set('auth.user', JSON.parse(user.response));
    } catch (error) {
      Store.set('error', error.reason || '');
    }
  }

  public async logout() {
    try {
      await authAPI.logout();
      Store.set('auth.user', null);
      Router.go(ROUTES.HOMEPAGE);
    } catch (error) {
      Store.set('error', error.reason || '');
    }
  }
}

export default new AuthController();
