import HTTP from '../utils/HTTPTransport';
import { ENDPOINTS } from './endpoints';

const chatAPIInstance = new HTTP(ENDPOINTS.CHATS.PATH);

export default class ChatAPI {
  getChats() {
    return chatAPIInstance.get(ENDPOINTS.CHATS.ROOT);
  }

  createChat(data: { title:string }) {
    return chatAPIInstance.post(ENDPOINTS.CHATS.ROOT, { data });
  }
}
