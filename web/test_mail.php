<?php
require_once "../src/bootstrap.php";

$from = "yuta_nakamura_i7@yahoo.co.jp";
$to = "y.nakamura.0502@softbank.ne.jp";
$subject = "新規メンバー登録が完了しました。＜与作:憩いの掲示板＞";

$email = "yuta.nakamura.i7@gmail.com";
$password = "********";
$nickname = "ゆうた";

$body = "{$nickname} さん、メンバー登録ありがとうございます。
ログイン情報は以下になります。

email:
{$email}

password: 
{$password}

＜与作:憩いの掲示板＞
http://ikoi.yosaku.info
";


$params = [
	"to" => $to,
	"from" => $from,
	"subject" => $subject,
	"body" => $body,
];
sendMail($params);
