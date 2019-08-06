import Utils from './Utils';

export const initialize = (): void => {
  console.info('initialize start');
  const watchSheetName: string = Utils.getWatchSheetName();
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(watchSheetName);
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
    sheet.setName(watchSheetName);
    const range = sheet.getRange('A1:D1');
    range.setBackground('yellow');
    const headers: string[] = new Array();
    headers.push('Notes');
    headers.push('RoomId');
    headers.push('WatchKeyword');
    headers.push('ReplyMessage');
    range.setValues([headers]);
  }
  const roomSheetName: string = Utils.getRoomSheetName();
  sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(roomSheetName);
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
    sheet.setName(roomSheetName);
    const range = sheet.getRange('A1:B1');
    range.setBackground('yellow');
    const headers: string[] = new Array();
    headers.push('Name');
    headers.push('RoomId');
    range.setValues([headers]);
  }
  console.info('initialize end');
};
