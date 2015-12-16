<?php
class Request {
	function __construct() {
		
	}
	function has($key) {
		return array_key_exists($key, $_REQUEST);
	}
	function param($key) {
		return @$_REQUEST[$key];
	}
	function params() { return $_REQUEST; }
	function path() {
		$pos = strpos($_SERVER["REQUEST_URI"], "?");
		if ( $pos === false ) {
			$path = $_SERVER["REQUEST_URI"];
		} else {
			$path = substr( $_SERVER["REQUEST_URI"], 0, $pos );
		}
		$path .= "/";
		$path = str_replace("//", "/", $path);
		return $path;
	}
}
