<?php
require_once __DIR__ . "/../../bootstrap.php";

$model = new BeforeSendMails();

$sql = "
CREATE TABLE IF NOT EXISTS `before_send_mails` (
	`id`	INTEGER DEFAULT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`mail_from`	TEXT DEFAULT NULL,
	`mail_to`	TEXT DEFAULT NULL,
	`subject`	TEXT DEFAULT NULL,
	`body`	TEXT DEFAULT NULL,
	`created`	TEXT DEFAULT NULL,
	`modified`	TEXT DEFAULT NULL
)
";
$model->query($sql);


$model = new NotificationSettings();
$sql = "
CREATE TABLE IF NOT EXISTS `notification_settings` (
	`id`	INTEGER DEFAULT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`user_id`	TEXT DEFAULT NULL,
	`interval_sec`	INTEGER DEFAULT NULL,
	`created`	TEXT DEFAULT NULL,
	`modified`	TEXT DEFAULT NULL
)
";
$model->query($sql);

echo "migration success." . PHP_EOL;
