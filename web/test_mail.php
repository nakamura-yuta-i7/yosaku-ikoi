<?php
require_once "../src/bootstrap.php";

$from = "yuta_nakamura_i7@yahoo.co.jp";
$to = "yuta@gnkmr.com";
$subject = "新規メンバー登録が完了しました。＜与作:憩いの掲示板＞";

$email = "yuta.nakamura.i7@gmail.com";
$password = "********";
$nickname = "ゆうた";

$body = "{$nickname} さん、メンバー登録ありがとうございます。<br>
ログイン情報は以下になります。<br>
<br>
email:<br>
{$email}<br>
<br>
password: <br>
{$password}<br>
<br>
＜与作:憩いの掲示板＞<br>
http://ikoi.yosaku.info<br>
";


$params = [
	"to" => $to,
	"from" => $from,
	"subject" => $subject,
	"body" => $body,
];
sendMail($params);
