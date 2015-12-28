<?php
require_once "../src/bootstrap.php";

$to = "yuta@gnkmr.com";
$subject = "テスト";
$body = "テスト件名";
$from_email = "yuta.nakamura.i7@gmail.com";
$from_name = "なかむらゆうた";

$params = [
	"to" => $to,
	"from" => $from_email,
	"subject" => $subject,
	"body" => $body,
];
sendMail($params);
