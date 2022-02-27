import HTTP from '../utils/HTTPTransport';
import { ENDPOINTS } from './endpoints';

const chatAPIInstance = new HTTP(ENDPOINTS.CHATS.PATH);

export default class ChatAPI {
  getChatList() {
    return chatAPIInstance.get(ENDPOINTS.CHATS.ROOT);
  }

  getChatData(chatId: number) {
    return chatAPIInstance.get(`/${chatId}${ENDPOINTS.CHATS.USERS}`);
  }

  deleteChatUsers(data: { users: number[], chatId: number }) {
    return chatAPIInstance.delete(ENDPOINTS.CHATS.USERS, { data });
  }

  addChatUsers(data: { users: number[], chatId: number }) {
    return chatAPIInstance.put(ENDPOINTS.CHATS.USERS, { data });
  }

  createChat(data: { title:string }) {
    return chatAPIInstance.post(ENDPOINTS.CHATS.ROOT, { data });
  }

  getChatToken(chatId: number) {
    return chatAPIInstance.post(`${ENDPOINTS.CHATS.TOKEN}/${chatId}`);
  }
}
