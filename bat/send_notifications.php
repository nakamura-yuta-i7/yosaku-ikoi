<?php
require_once __DIR__ . "/../src/bootstrap.php";

# 毎分起動するバッチ
# 処理内容: 溜まっているメールをユーザーの通知設定を見て送信する

$users = new Users();
$mails = new BeforeSendMails();
$settings = new NotificationSettings();
$userReadIds = new UserReadMessageIds();

foreach ( $users->getAll() as $user_id => $user ) {
	# そのユーザーに溜まっているメールを送ってよいかどうか
	# を判定してメールを送信する
	$can_send_mail = false;
	
	# そのユーザーは通知設定を変更しているのか
	$setting = $settings->findOne(["user_id"=>$user_id]);
	if ( $setting ) {
		# 設定していた場合
		$interval = $setting["interval"];
		$can_send_mail = canSendMailJudge($interval, "2016-01-09 00:00:00");
		
	} else {
		# 設定していないのであれば
		# 常に送信してOKという仕様なので
		$can_send_mail = true;
	}
	
	if ( $can_send_mail ) {
		$conditions = [
			"mail_to" => $user["email"],
		];
		$mailResult = $mails->findAll(compact("conditions"));
		
		$subject = "＜与作トーク＞に新しいメッセージがあります。";
		$body = "";
		foreach ($mailResult as $key => $mail) {
			$mails->delete(["id"=>$mail["id"]]);
			
			# ユーザーが既に読んだメッセージだったらスキップ
			$isRead = $userReadIds->findOne([
				"user_id" => $user_id,
				"message_id" => $mail["message_id"],
			]);
			if ( $isRead ) {
				# スキップ
				continue;
			}
			$from = $mail["mail_from"];
			$to   = $mail["mail_to"];
			$body .= $mail["created"] . " : " . $mail["body"] . PHP_EOL;
		}
		if ( ! $body ) {
			# 送るメッセージがなければスキップ
			continue;
		}
		$body .= "

＜与作:トーク＞
http://ikoi.yosaku.info/talk
";
		$params = [
			"to" => $to,
			"from" => $from,
			"subject" => $subject,
			"body" => $body,
		];
		sendMail($params);
	}
}



# 送信して良いのかどうかをユーザーの通知設定値から判断
function canSendMailJudge($interval, $now = null) {
	switch ($interval) {
		case "1min":
			# 毎分送るのでOK
			return true;
		
		case "15min":
			# 15分に一度通知ほしい場合だったら
			# 今という時間の分が15の倍数であった場合はOK
			$now_min = date_create($now)->format("i");
			return ( $now_min % 15 ) == 0;
			
		case "1hour":
			# 1時間に一度通知ほしい場合だったら
			# 今という時間の分が0であった場合はOK
			$now_min = date_create($now)->format("i");
			return $now_min == 0;
			
		case "6hour":
			# ６時間に一度通知がほしいなら
			# 今という時間の時が6の倍数、且つ分が0であったならOK
			$now_hour = date_create($now)->format("H");
			$now_min  = date_create($now)->format("i");
			if (
				( $now_hour == 0 || $now_hour == 6 || $now_hour == 12 || $now_hour == 18 ) &&
				( $now_min == 0 )
			) {
				return true;
			} else {
				return false;
			}
			
		case "24hour":
			# 24時間に一度通知がほしいなら
			# 今という時間の時が0、且つ分が0であったならOK
			$now_hour = date_create($now)->format("H");
			$now_min  = date_create($now)->format("i");
			if (
				( $now_hour == 0 ) &&
				( $now_min == 0 )
			) {
				return true;
			} else {
				return false;
			}
			
		default:
			return true;
	}
}
