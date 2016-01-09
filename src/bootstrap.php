<?php
date_default_timezone_set('Asia/Tokyo');
ini_set('display_errors',1);

define("APP_DIR", dirname(__FILE__) . "/../");
define("IS_STAGING", exec("hostname") != "users599.phy.lolipop.jp" );
define("SITE_URL", "http://ikoi.yosaku.info");
define("FROM_EMAIL", IS_STAGING ? "yuta_nakamura_i7@yahoo.co.jp" : "info@yosaku.info" );
define("UPLOAD_MAX_BYTE", 20000000); # 20MB

require_once APP_DIR . "src/passwords.php";
require_once APP_DIR . "src/libs/utils.php";
require_once APP_DIR . "src/libs/app_user.php";

require_once APP_DIR . "src/db/users.php";
require_once APP_DIR . "src/db/news.php";
require_once APP_DIR . "src/db/talks.php";
require_once APP_DIR . "src/db/messages.php";
require_once APP_DIR . "src/db/user_read_message_ids.php";
require_once APP_DIR . "src/db/before_send_mails.php";
require_once APP_DIR . "src/db/notification_settings.php";
