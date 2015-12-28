<?php
require_once dirname(__FILE__) . "/../libs/sqlite_abstract.php";
class YosakuIkoiAbstract extends SqliteAbstract {
	function __construct() {
		$dsn = "/home/vagrant/apps/yosaku-ikoi/" . "yosaku_ikoi.db";
		parent::__construct($dsn);
	}
}
