# gas_shareCalendar

## 0. 概要
  以下リンクの「特定のユーザーとカレンダーを共有する」をGASで実行するスクリプトになります。
  https://support.google.com/calendar/answer/37082?hl=ja&sjid=13223528475273316867-AP#

## 1. 実行環境
  - GoogleWorkSpace環境
  - 実行者；特権管理者を持つユーザーアカウントにて実行

## 2. 実行前の準備
  - GASにて、以下APIサービスを有効化する
    | APIサービス | バージョン |
    | Admin　SDK　API | directory_v1 |
    | Google Calendar API | v3 |
  - main.gsに記載されている以下変数を編集
    ```
    // debugモード true or false
    const debug = true;
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
    ```
    - 以下のように設定すれば、社内の全ユーザーが全員のカレンダーに対して変更できる権限となります。
      ```
      const targetGroupMail = "all@xxx";  全員所属しているグループアドレス
      const authorizedMail = "all@xxx";  全員所属しているグループアドレス
      const authorizedMailType = "group";
      const authorizedRole = "writer";
      ```

## 3. 実行
  - shareCalendar()
    - 実行すると上記で設定した変数に沿って、カレンダーの共有設定がされます
  - removeCalendar()
    - 実行すると上記で設定した変数に沿って、設定されているカレンダーの共有が削除されます 
