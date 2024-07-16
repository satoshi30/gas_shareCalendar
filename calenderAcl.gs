// AdminDirectoryのAPI
function getMembersList(groupMail) {
  var pageToken;
  var members = [];

  do {
    var result = AdminDirectory.Members.list(groupMail, {
      maxResults: 200,
      pageToken: pageToken
    });

    var pageMembers = result.members;
    members = members.concat(pageMembers);

    pageToken = result.nextPageToken;
  } while (pageToken);
  return (members);
}

// 指定したAclRuleで共有設定済みであれば、そのRuleIdをリターンする
function retAclRuleId(calendarId) {
  var res = Calendar.Acl.list(calendarId);
  for (var i = 0; i < res.items.length; i++) {
    if (res.items[i].scope.value == authorizedMail && res.items[i].role == authorizedRole) {
      return (res.items[i].id);
    }
  }
  return (null);
}

// メインの処理
function mainProcess(flag) {
  var members = getMembersList(targetGroupMail);

  var errorId = "";
  var num = 0;
  for (var i = 0; i < members.length; i++) {
    var calendarId = members[i].email;
    if (debug == false || calendarId == debugTargetMail) {
      try {
        var ruleId = retAclRuleId(calendarId);
        switch (flag) {
          case 0:
            // 共有済みがチェックして共有されていなかったら共有設定を行う（共有先に毎回メール行くので）
            if (ruleId == null)
              Calendar.Acl.insert(aclRule, calendarId);
            Logger.log(calendarId);
            num++;
            break;
          case 1:
            if (ruleId != null)
              Calendar.Acl.remove(calendarId, ruleId);
            Logger.log(calendarId);
            num++;
            break;
          default:
            break;
        }
      } catch(e) {
        console.log("Error");
        errorId += calendarId;
        errorId += '\n';
      }
    }
  }
  var message;
  if (errorId == "") {
    message = num.toString() + "件　成功\n";
  }
  else {
    message = "以下のIDで処理が失敗しています\n";
    message += errorId;
  }

  if (mailAlertFlag == true)
    GmailApp.sendEmail(recipient, `【GAS】カレンダー共有設定_${processRule[flag]}`, message);
}
