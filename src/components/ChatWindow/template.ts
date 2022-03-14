export default `
<div class="chat-window {{noCurrentChat}}">
  <div class="chat-window__header">
    <div class="chat-window__user-list">
      {{userList}}
      <div class="chat-window-add">
        {{userAddInput}} 
        {{userAddButton}}
      </div>
    </div>
  </div>
  <div class="chat-window__body">{{messageList}}</div>
  <div class="chat-window__placeholder">
    Чат не выбран. Добавить новый?
    <div class="chat-window-add">
        {{chatAddInput}} 
        {{chatAddButton}}
    </div>
  </div>
</div>
`;
