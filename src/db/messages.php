<?php
require_once dirname(__FILE__) . "/yosaku_ikoi_abstract.php";

class Messages extends YosakuIkoiAbstract {
	function post($values) {
		
		$this->insert($values);
		$message_id = $this->getLastInsertId();
		
		$id = $this->getLastInsertId();
		$postedData = $this->findById($id);
		
		$user_id = $values["user_id"];
		
		if ($user_id) {
			$readMessageIds = new UserReadMessageIds();
			$data = [
				"user_id" => $user_id,
				"message_id" => $message_id,
			];
			$readMessageIds->insert($data);
		}
		
		return $postedData;
	}
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
	function search($params) {
		$where = "";
		$wheres = [];
		if ( array_key_exists("talk_id", $params) ) {
			$talk_id = $params["talk_id"];
			$wheres[] = " talk_id = $talk_id ";
		}
		if ( array_key_exists("datetime", $params) ) {
			$datetime = $params["datetime"];
			$wheres[] = " '{$datetime}' <= created ";
		}
		if ( $wheres ) {
			$where = "WHERE " . implode(" AND ", $wheres);
		}
		$sql = " SELECT * FROM messages {$where} ";
		error_log($sql);
		$this->query($sql);
		$rows = $this->fetchAll();
		
		if ( isset($talk_id) ) {
			# talk_id が指定されている場合には
			# トークルームからのリクエストであると判断することにする
			# この場合、
			# メンバーログイン中であれば
			# 取得したメッセージは既読テーブルに記録する
			if ( AppUser::isMember() ) {
				static::changeToRead($rows);
			}
		}
		return $this->extendData($rows);
	}
	function findAllByTalkId($talk_id) {
		$talk_id = $this->pdo->quote($talk_id);
		$sql = " SELECT * from messages WHERE talk_id = {$talk_id} ORDER BY id ASC ";
		$this->query($sql);
		$rows = $this->fetchAll();
		
		# メンバーログイン中であれば
		# 取得したメッセージは既読テーブルに記録する
		if ( AppUser::isMember() ) {
			static::changeToRead($rows);
		}
		return $this->extendData($rows);
	}
	static function changeToRead($rows) {
		# メンバーログイン中であれば
		# 取得したメッセージは既読テーブルに記録する
		if ( AppUser::isMember() ) {
			$model = new UserReadMessageIds();
			$user_id = AppUser::get("id");
			foreach ($rows as $row) {
				$message_id = $row["id"];
				$values = compact("user_id", "message_id");
				$conditions = $values;
				if ( ! $model->findOne($conditions) ) {
					$model->insert($values);
				}
			}
		}
	}
	function getUnreadCountInTalkRoom($talk_id, $user_id, $last_login_time) {
		if ( ! $talk_id ) {
			throw new ErrorException("パラメータが不正です。  arguments:", var_export(func_get_args(), true));
		}
		$sql_time_condition = "";
		if ( $last_login_time ) {
			$sql_time_condition = " AND mes.created > '{$last_login_time}' ";
		}
		$sql = "
			SELECT 
				mes.id
			FROM messages AS mes
			LEFT JOIN user_read_message_ids AS urids
				 ON urids.user_id = {$user_id}
				AND mes.id = urids.message_id
			WHERE
				    mes.talk_id = {$talk_id} 
				AND urids.id IS NULL -- 既読メッセージレコードが無いこと
				{$sql_time_condition}
		";
		$this->query($sql);
		error_log($sql);
		
		$ids = array_map(function($row) {
			return $row["id"];
		}, $this->fetchAll() );
		
		return $ids;
	}
}
