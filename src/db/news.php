<?php
require_once dirname(__FILE__) . "/yosaku_ikoi_abstract.php";
class News extends YosakuIkoiAbstract {
	function getLatests() {
		$this->query("select * from news ORDER BY id DESC LIMIT 30");
		return $this->fetchAll();
	}
}
