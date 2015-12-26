<?php
class Response {
	function __construct() {
		
	}
	function render($view_name, $data) {
		extract($data);
		$path = APP_DIR . "src/views/{$view_name}/{$view_name}.php";
		include($path);
	}
	function json($data) {
		echo json_encode($data, JSON_UNESCAPED_UNICODE);
	}
	function redirect($url) {
		header('Location: ' . $url);
		exit;
	}
}
