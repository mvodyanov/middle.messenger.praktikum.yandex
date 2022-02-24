import ChatAPI from '../api/chat-api';
import { ENDPOINTS } from '../api/endpoints';
import { isArray } from '../utils';
import Store from '../utils/Store';

const chatApi = new ChatAPI();

class ChatController {
  public async getChatList() {
    try {
      Store.set('error', '');
      const chatList = await chatApi.getChatList();
      Store.set('chat.list', JSON.parse(chatList.response));
    } catch (error) {
      Store.set('error', error.reason || '');
    }
  }

  public async getChatData(chatId: number) {
    try {
      Store.set('error', '');
      const userList = await chatApi.getChatData(chatId);
      const chatToken = await chatApi.getChatToken(chatId);
      const { token } = JSON.parse(chatToken.response);

      Store.set('chat.current', {
        id: chatId,
        userList: JSON.parse(userList.response),
        token,
      });
    } catch (error) {
      Store.set('error', error.reason || '');
    }
  }

  public async deleteChatUsers(usersIds: number[]) {
    try {
      Store.set('error', '');
      const chatId = Store.getState().chat.current?.id!;
      await chatApi.deleteChatUsers({ users: usersIds, chatId });

      const userList = await chatApi.getChatData(chatId);
      Store.set('chat.current', { id: chatId, userList: JSON.parse(userList.response) });
    } catch (error) {
      Store.set('error', error.reason || '');
    }
  }

  public async addChatUsers(usersIds: number[]) {
    try {
      Store.set('error', '');
      const chatId = Store.getState().chat.current?.id!;
      await chatApi.addChatUsers({ users: usersIds, chatId });

      const userList = await chatApi.getChatData(chatId);
      Store.set('chat.current', { id: chatId, userList: JSON.parse(userList.response) });
    } catch (error) {
      Store.set('error', error.reason || '');
    }
  }

  public async clearCurrentChat() {
    Store.set('chat.current', null);
  }

  public async createChat(title: string) {
    try {
      Store.set('error', '');
      await chatApi.createChat({ title });

      const chatList = await chatApi.getChatList();
      Store.set('chat.list', JSON.parse(chatList.response));
    } catch (error) {
      Store.set('error', error.reason || '');
    }
  }

  public initSocket(userId:number, chatId: number, token: string) {
    // if (this.socket) {}
    const socket = new WebSocket(
      `${ENDPOINTS.SOCKET}${ENDPOINTS.CHATS.PATH}/${userId}/${chatId}/${token}`,
    );

    socket.addEventListener('open', () => {
      // eslint-disable-next-line no-console
      console.log('Соединение установлено');
      socket!.send(JSON.stringify({
        content: '0',
        type: 'get old',
      }));
    });

    socket.addEventListener('message', (event) => {
      // eslint-disable-next-line no-console
      console.log('Получены данные', event.data);
      const data = JSON.parse(event.data);
      if (isArray(data)) {
        Store.set('chat.current.messageList', data);
      } else if (data.type === 'message') {
        Store.set('chat.current.messageList', data);
        const oldMessages = Store.getState().chat.current?.messageList || [];
        Store.set('chat.current.messageList', [data, ...oldMessages]);
      }
    });

    return socket;
  }
}

export default new ChatController();
