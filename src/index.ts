import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Router from './utils/Router';
import { ROUTES } from './utils/consts';

const router = new Router('#app');

router
  .use(ROUTES.HOMEPAGE, new Login())
  .use(ROUTES.LOGIN, new Login())
  .use(ROUTES.REGISTER, new Register())
  .use(ROUTES.CHAT, new Chat())
  .use(ROUTES.PROFILE, new Profile())
  .use(ROUTES.ERROR[500], new Error(500))
  .use(ROUTES.ERROR[404], new Error(404))
  .start();
