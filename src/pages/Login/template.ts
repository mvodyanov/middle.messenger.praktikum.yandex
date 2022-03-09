export default `
<div class="login">
    <h1 class="login__title">Вход</h1>
    <form class="form login__form">
        {{formControlLogin}}
        {{formControlPassword}}
        <span class="form-control__error">{{errorText}}</span>
        <div class="login__controls">
            {{button}}
            {{registerLink}}
        </div>
    </form>
</div>
`;
