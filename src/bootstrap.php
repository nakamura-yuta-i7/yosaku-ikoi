<?php
date_default_timezone_set('Asia/Tokyo');
define("APP_DIR", dirname(__FILE__) . "/../");
define("IS_STAGING", exec("hostname") != "yosaku.info" );
define("SITE_URL", "http://ikoi.yosaku.info");
define("FROM_EMAIL", IS_STAGING ? "yuta_nakamura_i7@yahoo.co.jp" : "info@yosaku.info" );

require_once APP_DIR . "src/passwords.php";
require_once APP_DIR . "src/libs/utils.php";
require_once APP_DIR . "src/libs/app_user.php";

require_once APP_DIR . "src/db/users.php";
require_once APP_DIR . "src/db/news.php";
