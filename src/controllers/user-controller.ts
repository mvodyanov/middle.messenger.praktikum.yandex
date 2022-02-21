import UserAPI from '../api/user-api';
import { Children } from '../types/types';
import { validateFormControls } from '../utils/events';
import Store from '../utils/Store';

const userApi = new UserAPI();

class UserController {
  public async changeUser(children: Children) {
    try {
      Store.set('error', '');
      const {
        avatar, formControlOldPassword, formControlNewPassword, ...profileForm
      } = children;

      const profileData = validateFormControls(profileForm);
      await userApi.changeUser(profileData);

      if (formControlOldPassword.getValue() !== '' || formControlNewPassword.getValue() !== '') {
        const passwordData = validateFormControls({
          formControlOldPassword,
          formControlNewPassword,
        });
        await userApi.changePassword(passwordData);
      }
    } catch (error) {
      Store.set('error', error.reason || '');
    }
  }
}

export default new UserController();
