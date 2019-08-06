const KEY = 'trigger';
const FUNCTION_NAME = 'noticeUpdate';

export const updateSchedule = (): void => {
  deleteTrigger_();
  let triggerId = ScriptApp.newTrigger(FUNCTION_NAME)
    .timeBased()
    .everyMinutes(1)
    .create()
    .getUniqueId();
  setTrigger_(triggerId);
};

//指定したkeyに保存されているトリガーIDを使って、トリガーを削除する
function deleteTrigger_() {
  var triggerId = PropertiesService.getScriptProperties().getProperty(KEY);
  if (!triggerId) return;
  ScriptApp.getProjectTriggers()
    .filter(function(trigger) {
      return trigger.getUniqueId() == triggerId;
    })
    .forEach(function(trigger) {
      ScriptApp.deleteTrigger(trigger);
    });
  PropertiesService.getScriptProperties().deleteProperty(KEY);
}

//トリガーを発行
function setTrigger_(triggerId) {
  //あとでトリガーを削除するためにトリガーIDを保存しておく
  PropertiesService.getScriptProperties().setProperty(KEY, triggerId);
}
