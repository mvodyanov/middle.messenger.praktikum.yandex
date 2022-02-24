import ChatAPI from '../api/chat-api';
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

  public async getChatUsers(chatId: number) {
    try {
      Store.set('error', '');
      const userList = await chatApi.getChatUsers(chatId);
      Store.set('chat.current', { id: chatId, userList: JSON.parse(userList.response) });
    } catch (error) {
      Store.set('error', error.reason || '');
    }
  }

  public async deleteChatUsers(usersIds: number[]) {
    try {
      Store.set('error', '');
      const chatId = Store.getState().chat.current?.id!;
      await chatApi.deleteChatUsers({ users: usersIds, chatId });

      const userList = await chatApi.getChatUsers(chatId);
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

      const userList = await chatApi.getChatUsers(chatId);
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
}

export default new ChatController();
