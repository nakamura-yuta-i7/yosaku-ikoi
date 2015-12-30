<?php
session_start();

class AppUser {
	static function setUser(Array $user) {
		$_SESSION["user"] = $user;
		
		# メンバーがログインした場合
		# ログイン時間をここで記録する
		# セッションに入った情報は前回のログイン情報ということになることを留意すること
		# ※まだ前回のログイン情報は使う必要はないが必要となる可能性もある
		if ( isset($user["id"]) ) {
			$users = new Users();
			$users->update([
				"last_login_time" => date_create()->format("Y-m-d H:i:s")
			], ["id"=>$user["id"]]);
		}
	}
	static function isMember() {
		return isset($_SESSION["user"]["id"]);
	}
	static function getUser() {
		if ( isset($_SESSION) && isset($_SESSION["user"]) ) {
			return $_SESSION["user"];
		}
		return null;
	}
	static function get($key) {
		return isset($_SESSION["user"][$key]) ? $_SESSION["user"][$key] : false ;
	}
	static function clear() {
		unset( $_SESSION["user"] );
	}
}
