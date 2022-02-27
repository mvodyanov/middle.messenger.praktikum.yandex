import HTTP from '../utils/HTTPTransport';
import { ENDPOINTS } from './endpoints';
import { FormData } from '../types/types';

const userAPIInstance = new HTTP(ENDPOINTS.USER.PATH);

export default class UserAPI {
  changeUser(data: FormData) {
    return userAPIInstance.put(ENDPOINTS.USER.PROFILE, { data });
  }

  changeAvatar(data: FormData) {
    return userAPIInstance.put(ENDPOINTS.USER.PASSWORD, { data });
  }

  changePassword(data: FormData) {
    return userAPIInstance.put(ENDPOINTS.USER.PASSWORD, { data });
  }
}
