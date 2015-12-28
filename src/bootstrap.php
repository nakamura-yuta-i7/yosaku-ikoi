<?php
date_default_timezone_set('Asia/Tokyo');
define("APP_DIR", dirname(__FILE__) . "/../");
define("IS_STAGING", exec("hostname") != "yosaku.info" );

require_once APP_DIR . "src/libs/passwords.php";
require_once APP_DIR . "src/libs/utils.php";
require_once APP_DIR . "src/libs/app_user.php";

require_once APP_DIR . "src/db/users.php";
require_once APP_DIR . "src/db/news.php";
