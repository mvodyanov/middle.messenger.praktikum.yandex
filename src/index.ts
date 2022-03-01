import store from './utils/Store';
import Login from './pages/Login';
import Register from './pages/Register';
import { Error404, Error500 } from './pages/Error';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Router from './utils/Router';
import { appSelector, ROUTES } from './utils/consts';

const getIsLoggedIn = () => !!store.getState().auth.user;

export const router = new Router(appSelector, window);

router
  .initUser().then(() => {
    router
      .use(ROUTES.HOMEPAGE, Login, () => !getIsLoggedIn())
      .use(ROUTES.REGISTER, Register, () => !getIsLoggedIn())
      .use(ROUTES.CHAT, Chat, getIsLoggedIn)
      .use(ROUTES.PROFILE, Profile, getIsLoggedIn)
      .use(ROUTES.ERROR[500], Error500)
      .use(ROUTES.ERROR[404], Error404)
      .start();
  });
