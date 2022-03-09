export default `
<div class="form-control {{className}}">
  <div class="form-control__label">{{label}}</div>
  <input
    class="form-control__input"
    type="{{type}}"
    name="name"
    value="{{value}}"
    placeholder="{{placeholder}}"
    autocomplete="off"
  />
  <span class="form-control__error">{{errorText}}</span>
</div>
`;
