<?php
require_once __DIR__ . "/../../bootstrap.php";

$model = new BeforeSendMails();

$sql = "
CREATE TABLE IF NOT EXISTS `before_send_mails` (
	`id`	INTEGER DEFAULT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`message_id`	INTEGER DEFAULT NULL,
	`mail_from`	TEXT DEFAULT NULL,
	`mail_to`	TEXT DEFAULT NULL,
	`subject`	TEXT DEFAULT NULL,
	`body`	TEXT DEFAULT NULL,
	`created`	TEXT DEFAULT NULL,
	`modified`	TEXT DEFAULT NULL
)
";
$model->query($sql);

echo "migration success." . PHP_EOL;
