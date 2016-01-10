<?php
require_once __DIR__ . "/../../bootstrap.php";

$model = new NotificationSettings();
$sql = "
CREATE TABLE IF NOT EXISTS `notification_settings` (
	`id`	INTEGER DEFAULT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`user_id`	INTEGER DEFAULT NULL,
	`interval`	TEXT DEFAULT NULL,
	`created`	TEXT DEFAULT NULL,
	`modified`	TEXT DEFAULT NULL
)
";
$model->query($sql);

echo "migration success." . PHP_EOL;
