export default `
<div class="chat">
  <div class="chat-list">
    <div class="chat-list__header">{{profileLink}}</div>
    <div class="chat-list__body">{{chatList}}</div>
  </div>
  <div class="chat-content">
    {{chatWindow}}
    <div class="chat-content-control">
      <button class="chat-content-control__file" type="file">
        <img src="/file.1fffb63c.svg" /></button
      >{{formControlMessage}} {{button}}
    </div>
  </div>
</div>
`;
