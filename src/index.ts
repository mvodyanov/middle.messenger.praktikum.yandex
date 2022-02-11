import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import { Block } from './types/types';

const app = document.querySelector('#app')!;

const ROUTES = {
  HOMEPAGE: '',
  LOGIN: '#login',
  REGISTER: '#register',
  CHAT: '#chat',
  PROFILE: '#profile',
  ERROR: {
    404: '#error/404',
    500: '#error/500',
  },
};

const render = (Page: Block) => {
  app.innerHTML = '';
  app.appendChild(Page.render());
};

const hashHandler = () => {
  const { hash } = window.location;
  switch (hash) {
    case ROUTES.HOMEPAGE:
    case ROUTES.LOGIN: render(new Login()); break;
    case ROUTES.REGISTER: render(new Register()); break;
    case ROUTES.CHAT: render(new Chat()); break;
    case ROUTES.PROFILE: render(new Profile()); break;
    case ROUTES.ERROR[500]: render(new Error(500)); break;
    default: render(new Error(404));
  }
};

hashHandler();
window.addEventListener('hashchange', hashHandler);
