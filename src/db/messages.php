<?php
require_once dirname(__FILE__) . "/yosaku_ikoi_abstract.php";

class Messages extends YosakuIkoiAbstract {
	function findById($id) {
		$row = parent::findById($id);
		return $this->extendData([$row])[0];
	}
	function extendData($rows) {
		// メッセージデータを拡張
		
		// ユーザー情報を追加
		$users = (new Users())->getAll();
		$rows = array_map(function($row) use ($users) {
			$user_id = $row["user_id"];
			$user = [];
			if ( array_key_exists($user_id, $users) ) {
				$user = $users[$user_id];
			}
			$row["user"] = $user;
			return $row;
		}, $rows);
		
		return $rows;
	}
	function findAllByTalkId($talk_id) {
		$talk_id = $this->pdo->quote($talk_id);
		$sql = " SELECT * from messages WHERE talk_id = {$talk_id} ORDER BY id ASC ";
		$this->query($sql);
		$rows = $this->fetchAll();
		
		return $this->extendData($rows);
	}
}
