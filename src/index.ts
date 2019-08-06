import { initialize } from './initialize';
import { updateSchedule } from './updateSchedule';
import { inputToken } from './inputToken';
import { getRooms } from './getRooms';
import { noticeUpdate } from './noticeUpdate';

function onOpen() {
  var lang = Session.getActiveUserLocale();
  let ui = SpreadsheetApp.getUi();
  ui.createMenu('gas-SimpleReplyChatwork')
    .addSubMenu(
      ui
        .createMenu(lang === 'ja' ? '初期設定' : 'Initial setting')
        .addItem(lang === 'ja' ? '設定シート作成' : 'Create config sheets', 'initialize')
        .addItem(lang === 'ja' ? 'Token設定' : 'Input token', 'inputToken')
        .addItem(lang === 'ja' ? 'ルーム一覧を取得' : 'Get rooms', 'getRooms')
    )
    .addSeparator()
    .addItem(lang === 'ja' ? '手動実行' : 'Notice update', 'noticeUpdate')
    .addItem(lang === 'ja' ? 'スケジュール実行' : 'Schedule', 'updateSchedule')
    .addToUi();
}

declare let global: any;
global.onOpen = onOpen;
global.initialize = initialize;
global.inputToken = inputToken;
global.getRooms = getRooms;
global.updateSchedule = updateSchedule;
global.noticeUpdate = noticeUpdate;
