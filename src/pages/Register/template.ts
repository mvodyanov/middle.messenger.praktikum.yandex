export default `
<div class="login">
    <h1 class="login__title">Регистрация</h1>
    <form class="form login__form">
        {{formControlEmail}}
        {{formControlLogin}}
        {{formControlFirstName}}
        {{formControlSecondName}}
        {{formControlPhone}}
        {{formControlPassword}}
        {{formControlPasswordRepeat}}    
        <span class="form-control__error">{{errorText}}</span>
        <div class="login__controls">
            {{button}}        
            {{loginLink}}      
        </div>
    </form>
</div>
`;
