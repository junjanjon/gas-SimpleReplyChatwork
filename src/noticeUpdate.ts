import Utils from './Utils';
import WatchRoom from './WatchRoom';

type PairMessage = {
  watchKeywords: string[];
  replyMessages: string[];
};

export const noticeUpdate = (): void => {
  let sheet: GoogleAppsScript.Spreadsheet.Sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    Utils.getWatchSheetName()
  );
  let range: GoogleAppsScript.Spreadsheet.Range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 4);
  let feedList: any[][] = range.getValues();

  let watchKeywordsHash: { [key: string]: PairMessage } = {};

  for (let feed of feedList) {
    // roomId, watchKeyword, replyMessage の設定がなければ、処理の対象外
    const roomId = feed[1];
    const watchKeyword = feed[2];
    const replyMessage = feed[3];
    if (roomId == '' || watchKeyword == '' || replyMessage == '') {
      continue;
    }

    if (watchKeywordsHash[roomId]) {
      let pairMessage: PairMessage = watchKeywordsHash[roomId];
      pairMessage.watchKeywords.push(watchKeyword);
      pairMessage.replyMessages.push(replyMessage);
    } else {
      let pairMessage: PairMessage = {
        watchKeywords: [watchKeyword],
        replyMessages: [replyMessage]
      };
      watchKeywordsHash[roomId] = pairMessage;
    }
  }

  for (let roomId in watchKeywordsHash) {
    let watchKeywords: string[] = watchKeywordsHash[roomId].watchKeywords;
    let replyMessages: string[] = watchKeywordsHash[roomId].replyMessages;
    let watchRoom: WatchRoom = new WatchRoom(roomId, watchKeywords, replyMessages);
    watchRoom.execute();
  }
};
