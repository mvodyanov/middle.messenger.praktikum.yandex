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

  public async changeUserAvatar(files: FileList | null) {
    if (files) {
      const avatarFile = files[0];
      const formData = new FormData();
      formData.append('avatar', avatarFile);
      const res = await userApi.changeAvatar(formData);

      Store.set('auth.user', (JSON.parse(res.response)));
    }
  }
}

export default new UserController();
