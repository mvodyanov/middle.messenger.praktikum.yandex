export default `
<div class="profile">
  {{chatLink}} {{logoutLink}}
  <div class="profile__content">
    <form class="profile-form">
      <div class="profile-form__group">{{avatar}}</div>
      <div class="profile-form__group">
        {{formControlFirstName}} {{formControlSecondName}}
        {{formControlDisplayName}} {{formControlLogin}} {{formControlEmail}}
        {{formControlPhone}}
      </div>
      <div class="profile-form__group">
        {{formControlOldPassword}} {{formControlNewPassword}}
      </div>
      <span class="form-control__error profile-form__error">{{errorText}}</span
      >{{button}}
    </form>
  </div>
</div>
`;
