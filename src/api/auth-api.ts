import HTTP from '../utils/HTTPTransport';
import { ENDPOINTS } from './endpoints';
import { FormData } from '../types/types';

const authAPIInstance = new HTTP(ENDPOINTS.AUTH.PATH);

export default class AuthAPI {
  signUp(data: FormData) {
    return authAPIInstance.post(ENDPOINTS.AUTH.SIGNUP, { data });
  }

  signIn(data: FormData) {
    return authAPIInstance.post(ENDPOINTS.AUTH.SIGNIN, { data });
  }

  getUser() {
    return authAPIInstance.get(ENDPOINTS.AUTH.USER);
  }

  logout() {
    return authAPIInstance.post(ENDPOINTS.AUTH.LOGOUT);
  }
}
