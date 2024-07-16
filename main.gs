// 設定変数ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// debugモード true or false
const debug = false;
// debug = trueのとき、targetGroupMailに所属するユーザーを指定すればこのユーザーのみ権限が変わる
const debugTargetMail = "xxx@xxx";

// アクセス権を与えるユーザーが所属するグループアドレス（共有を受ける）
const targetGroupMail = "xxx@xxx";
// アクセス権を持つアドレス（共有先となる）
const authorizedMail = "xxx@xxx";
// authorizedMailのアドレスType "user" or "group"
const authorizedMailType = "group";
// アクセス権のロール owner, writer, reader, freeBusyReader, none
// ownerのroleを付与するとカレンダー自体も削除できてしまうのでwriterに
const authorizedRole = "writer";

// 結果のメール通知フラグ
const mailAlertFlag = true;
// メール通知の受信者
const recipient = "xxx@xxx";
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー


const aclRule = {
  "role": authorizedRole,
  "scope": {
    "type": authorizedMailType,
    "value": authorizedMail,
  }
};

// 共有（挿入）or 削除モードがある
const processRule = {
  0: "insert",
  1: "remove",
};

function shareCalendar() {
  mainProcess(0);
}

function removeCalendar() {
  mainProcess(1);
}

// 参考リンクーーーーーーーーーーーーーーーーーーーーーーー

// カレンダーの共有
// https://support.google.com/a/answer/60765?hl=ja#zippy=%2C%E5%86%85%E9%83%A8%E5%85%B1%E6%9C%89%E3%81%AE%E3%83%87%E3%83%95%E3%82%A9%E3%83%AB%E3%83%88%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B

// 権限の説明
// https://support.google.com/calendar/answer/37082?sjid=468213559151724846-AP#controlaccess&zippy=%2C%E5%85%B1%E6%9C%89%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC%E3%81%AE%E6%A8%A9%E9%99%90%E3%81%AE%E8%A8%AD%E5%AE%9A

// CalenderAPI ACL
// https://developers.google.com/calendar/api/v3/reference/acl?hl=ja
