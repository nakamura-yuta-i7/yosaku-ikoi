<?php
require_once dirname(__FILE__) . "/request.php";
require_once dirname(__FILE__) . "/response.php";

class Router {
	function __construct() {
		$this->_req = new Request();
		$this->_res = new Response();
		$this->_urls = [];
	}
	function getRes() { return $this->_res; }
	function get($url, $callback) {
		$url .= "/";
		$url = str_replace("//", "/", $url);
		$this->_urls[$url] = $callback;
	}
	function post($url, $callback) {
		$url .= "/";
		$url = str_replace("//", "/", $url);
		$this->_urls[$url] = $callback;
	}
	function listen() {
		$path = $this->_req->path();
		if (
			$path != "/login/" && 
			$path != "/login/new-member/" && 
			$path != "/auth/" &&  
			$path != "/tokumei-login/" && 
			! AppUser::getUser()
		) {
			$this->_res->redirect("/login");
		}
		foreach ($this->_urls as $url => $callback) {
			if ( $url == $path ) {
				return $callback($this->_req, $this->_res);
			}
		}
		throw new NotFoundException(404);
	}
}

class NotFoundException extends ErrorException {
	
}
