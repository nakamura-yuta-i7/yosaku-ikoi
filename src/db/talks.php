<?php
require_once dirname(__FILE__) . "/yosaku_ikoi_abstract.php";

class Talks extends YosakuIkoiAbstract {
	function getAll() {
		$table = $this->table;
		$fields = [
			"talks.id",
			"talks.title",
			"talks.created",
			"(SELECT created FROM messages WHERE messages.talk_id = talks.id 
				ORDER BY messages.id DESC LIMIT 1) AS last_updated ",
			"(SELECT message FROM messages WHERE messages.talk_id = talks.id 
				ORDER BY messages.id DESC LIMIT 1) AS last_message ",
		];
		$field_strings = implode(",\n", $fields);
		$fields_wrap = [
			"id",
			"title",
			"created",
			"IFNULL( talks_wrap.last_updated, talks_wrap.created ) AS last_updated",
			"IFNULL( talks_wrap.last_message, 'まだメッセージがありません' ) AS last_message",
		];
		$field_strings_wrap = implode(",\n", $fields_wrap);
		$this->query("
			SELECT * FROM (
				SELECT {$field_strings_wrap}
				FROM (SELECT {$field_strings} FROM talks) AS talks_wrap
			) AS tmp_table
			ORDER BY last_updated DESC
		");
		$rows = $this->fetchAll();
		
		// 作りたてトークフラグ付与
		// 条件：作ってから１日未満
		$rows = array_map(function($row) {
			$isNew = false;
			if ( $row["created"] > date_create()->modify("-1 day")->format("Y-m-d H:i:s") ) {
				$isNew = true;
			}
			$row["is_new"] = $isNew;
			return $row;
		}, $rows);
		
		// 未読メッセージ数を追加
		$messages = new Messages();
		$rows = array_map(function($row) use ($messages) {
			$row["unread_count"] = 10;
			return $row;
		}, $rows);
		
		return $rows;
	}
}