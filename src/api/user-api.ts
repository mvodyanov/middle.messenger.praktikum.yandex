import HTTP from '../utils/HTTPTransport';
import { ENDPOINTS } from './endpoints';
import { FormData as TFormData } from '../types/types';

const userAPIInstance = new HTTP(ENDPOINTS.USER.PATH);

export default class UserAPI {
  changeUser(data: TFormData) {
    return userAPIInstance.put(ENDPOINTS.USER.PROFILE, { data });
  }

  changePassword(data: TFormData) {
    return userAPIInstance.put(ENDPOINTS.USER.PASSWORD, { data });
  }

  changeAvatar(data: FormData) {
    return userAPIInstance.put(ENDPOINTS.USER.AVATAR, {
      data,
      headers: null,
      isRawData: true,
    });
  }
}
