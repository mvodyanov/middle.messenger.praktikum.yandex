export default `
<div class="chat">
  <div class="chat-list">
    <div class="chat-list__header">{{profileLink}}</div>
    <div class="chat-list__body">{{chatList}}</div>
  </div>
  <div class="chat-content">
    {{chatWindow}}
    <div class="chat-content-control">
      {{formControlMessage}}
      {{button}}
    </div>
  </div>
</div>
`;
