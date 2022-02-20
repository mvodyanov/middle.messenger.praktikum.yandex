import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Router from './utils/Router';
import { ROUTES } from './utils/consts';
import store from './utils/Store';

const getIsLoggedIn = () => !!store.getState().auth.user;

Router
  .use(ROUTES.HOMEPAGE, new Login(), () => !getIsLoggedIn())
  .use(ROUTES.REGISTER, new Register(), () => !getIsLoggedIn())
  .use(ROUTES.CHAT, new Chat(), getIsLoggedIn)
  .use(ROUTES.PROFILE, new Profile(), getIsLoggedIn)
  .use(ROUTES.ERROR[500], new Error(500))
  .use(ROUTES.ERROR[404], new Error(404))
  .initUser()
  .then(() => Router.start());
