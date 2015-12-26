<?php
session_start();
class AppUser {
	static function setUser(Array $user) {
		$_SESSION["user"] = $user;
	}
	static function getUser() {
		if ( isset($_SESSION) && $_SESSION["user"] ) {
			return $_SESSION["user"];
		}
		return null;
	}
}
