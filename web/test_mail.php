<?php
require_once "../src/bootstrap.php";

$to = "yuta@gnkmr.com";
$subject = "テスト";
$body = "テスト件名";
$from_email = "yuta.nakamura.i7@gmail.com";
$from_name = "なかむらゆうた";
sendMail($to, $subject, $body, $from_email,$from_name);
