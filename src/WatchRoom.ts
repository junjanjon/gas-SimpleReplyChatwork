import Utils from './Utils';

export default class WatchRoom {
  roomId: string;
  watchKeywords: string[];
  replyMessages: string[];
  token: string;

  /**
   * constructor
   * @param roomId
   * @param watchKeywords
   * @param replyMessages
   */
  constructor(roomId: string, watchKeywords: string[], replyMessages: string[]) {
    this.roomId = roomId;
    this.watchKeywords = watchKeywords;
    this.replyMessages = replyMessages;
    this.token = Utils.getChatworkToken();
    Utils.checkNotEmpty(this.token, 'token が 未設定です。token を設定してください。');
  }

  /**
   * execute
   */
  public execute() {
    const messages = this.watchRoomMessages();
    for (let message of messages) {
      for (let i = 0; i < this.watchKeywords.length; i++) {
        if (message.indexOf(this.watchKeywords[i]) != -1) {
          this.postMessage(this.replyMessages[i]);
          break;
        }
      }
    }
  }

  public watchRoomMessages(): string[] {
    try {
      const options: Object = {
        method: 'get',
        headers: { 'X-ChatWorkToken': this.token }
      };
      let response = Utils.fetchAsJson(
        'https://api.chatwork.com/v2/rooms/' + this.roomId + '/messages',
        options
      );
      let values = new Array<string>();
      for (let message of response) {
        values.push(message['body']);
      }
      return values;
    } catch (e) {
      return [''];
    }
  }

  /**
   * postMessage
   * @param message
   */
  public postMessage(message: string) {
    if (message == '') {
      return;
    }
    let payload = {
      body: message,
      self_unread: '1'
    };
    const options: Object = {
      method: 'post',
      headers: { 'X-ChatWorkToken': this.token },
      payload: payload
    };
    try {
      Utils.fetchAsJson('https://api.chatwork.com/v2/rooms/' + this.roomId + '/messages', options);
    } catch (e) {}
  }
}
