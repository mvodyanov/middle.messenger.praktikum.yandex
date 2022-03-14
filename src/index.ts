import store from './utils/Store';
import Login from './pages/Login';
import Register from './pages/Register';
import { Error404, Error500 } from './pages/Error';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Router from './utils/Router';
import { appSelector, ROUTES } from './utils/consts';
import authController from './controllers/auth-controller';
import './styles/index.scss';

const getIsLoggedIn = () => !!store.getState().auth.user;

export const appRouter = new Router(appSelector, window);

authController.initUser()
  .then(() => {
    appRouter
      .use(ROUTES.HOMEPAGE, Login, () => !getIsLoggedIn())
      .use(ROUTES.REGISTER, Register, () => !getIsLoggedIn())
      .use(ROUTES.CHAT, Chat, getIsLoggedIn)
      .use(ROUTES.PROFILE, Profile, getIsLoggedIn)
      .use(ROUTES.ERROR[500], Error500)
      .use(ROUTES.ERROR[404], Error404)
      .start();
  });
