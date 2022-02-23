import ChatAPI from '../api/chat-api';
import Store from '../utils/Store';

const chatApi = new ChatAPI();

class ChatController {
  public async getChats() {
    try {
      Store.set('error', '');
      const chats = await chatApi.getChats();
      Store.set('chats', JSON.parse(chats.response));
    } catch (error) {
      Store.set('error', error.reason || '');
    }
  }

  public async createChat() {
    try {
      Store.set('error', '');
      await chatApi.createChat({ title: 'second chat' });
    } catch (error) {
      Store.set('error', error.reason || '');
    }
  }
}

export default new ChatController();
