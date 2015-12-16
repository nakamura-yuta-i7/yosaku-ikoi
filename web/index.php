<?php
require dirname(__FILE__) . "/../src/bootstrap.php";

require_once APP_DIR . "src/router.php";
$router = new Router();
$router->get("/", function($req, $res) {
	$title = "ホーム";
	$res->render("home", compact("title"));
});
$router->get("/login", function($req, $res) {
	$title = "ログイン";
	$res->render("login", compact("title"));
});
$router->post("/auth", function($req, $res) {
	if ( $req->param("email") == "yuta.nakamura.i7@gmail.com"
		&& $req->param("password") == "" ) {
		return $res->json("認証OK");
	}
	throw new JsonResErrorException("認証エラー");
});

try {
	$router->listen();
	
} catch( JsonResErrorException $e ) {
	$res = $router->getRes();
	$res->json([
		"error" => $e->getMessage(),
	]);
} catch( Exception $e ) {
	# 何かしら例外が発生したら
	$res = $router->getRes();
	# エラー専用画面を表示
	$res->render("error", [
		"message" => $e->getMessage(),
	]);
}

class JsonResErrorException extends ErrorException {
	
}
