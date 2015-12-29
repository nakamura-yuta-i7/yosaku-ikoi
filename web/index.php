<?php
require dirname(__FILE__) . "/../src/bootstrap.php";

require_once APP_DIR . "src/router.php";
$router = new Router();
$router->get("/test", function($req, $res) {
	$res->render("test", ["title"=>"テスト"]);
});
$router->get("/", function($req, $res) {
	$res->render("index", ["title"=>"ホーム"]);
});
$router->get("/members", function($req, $res) {
	$res->render("index", ["title"=>"メンバー"]);
});
$router->get("/talk", function($req, $res) {
	$res->render("index", ["title"=>"トーク"]);
});
$router->get("/talk_room", function($req, $res) {
	$id = $req->param("id");
	function getTalkRoom($id) {
		return [ "title" => "トークID:1", ];
	}
	$res->render("talk_room", [ "title"=>getTalkRoom($id)["title"] ]);
});
$router->get("/api/me", function($req, $res) {
	$res->json( AppUser::getUser() );
});
$router->get("/api/news", function($req, $res) {
	$news = new News();
	$res->json( $news->getLatests() );
});
$router->get("/api/messages", function($req, $res) {
	$id = $req->param("talk_room_id");
	function getUser() {
		return [
			"email" => "yuta.nakamura.i7@gmail.com",
			"name" => "なかむらゆうた",
			"nickname" => "ゆうた",
		];
	}
	function getMessages($talk_room_id) {
		return [
			[ "id" => 1, "message" => "とりとりとり！とりとりとり！とりとりとり！とりとりとり！とりとりとり！とりとりとり！とりとりとり！とりとりとり！とりとりとり！とりとりとり！とりとりとり！", "user" => getUser(),
				"time" => date_create()->format("H:i"), "date" => date_create("Y/m/d") ],
			[ "id" => 2, "message" => "ガーガーバード！", "user" => getUser(),
				"time" => date_create()->format("H:i"), "date" => date_create("Y/m/d") ],
			[ "id" => 3, "message" => "キイロイトリ", "user" => getUser(),
				"time" => date_create()->format("H:i"), "date" => date_create("Y/m/d") ],
			[ "id" => 4, "message" => "とりとりとり！<br>とりとりとり！<br>とりとりとり！<br>", "user" => getUser(),
				"time" => date_create()->format("H:i"), "date" => date_create("Y/m/d") ],
			[ "id" => 5, "message" => "ガーガーバード！", "user" => getUser(),
				"time" => date_create()->format("H:i"), "date" => date_create("Y/m/d") ],
			[ "id" => 6, "message" => "キイロイトリ<br>キイロイトリ<br>キイロイトリ<br>キイロイトリ<br>", "user" => getUser(),
				"time" => date_create()->format("H:i"), "date" => date_create("Y/m/d") ],
			[ "id" => 7, "message" => "とりとりとり！", "user" => getUser(),
				"time" => date_create()->format("H:i"), "date" => date_create("Y/m/d") ],
			[ "id" => 8, "message" => "ガーガーバード！", "user" => getUser(),
				"time" => date_create()->format("H:i"), "date" => date_create("Y/m/d") ],
			[ "id" => 9, "message" => "キイロイトリ", "user" => getUser(),
				"time" => date_create()->format("H:i"), "date" => date_create("Y/m/d") ],
			[ "id" => 10, "message" => "とりとりとり！<br>とりとりとり！<br>とりとりとり！<br>", "user" => getUser(),
				"time" => date_create()->format("H:i"), "date" => date_create("Y/m/d") ],
			[ "id" => 11, "message" => "ガーガーバード！", "user" => getUser(),
				"time" => date_create()->format("H:i"), "date" => date_create("Y/m/d") ],
			[ "id" => 12, "message" => "キイロイトリ<br>キイロイトリ<br>キイロイトリ<br>キイロイトリ<br>", "user" => getUser(),
				"time" => date_create()->format("H:i"), "date" => date_create("Y/m/d") ],
		];
	}
	$res->json([ "messages"=>getMessages($id) ]);
});

$router->get("/setting", function($req, $res) {
	$res->render("index", ["title"=>"せってい"]);
});
$router->get("/api/members", function($req, $res) {
	$users = new Users();
	$res->json($users->findAll());
});
$router->get("/api/setting", function($req, $res) {
	$data = [
		[ "email" => "yuta.nakamura.i7@gmail.com", "name" => "中村 ゆうた", "nickname" => "ゆうた" ],
		[ "email" => "yuta@gnkmr.com", "name" => "ゆうた なかむら", "nickname" => "gnkmr" ],
	];
	$res->json($data);
});
$router->get("/api/talk/list", function($req, $res) {
	$data = [
		[ "id"=>1, "title" => "トーク1", "last_message" => "テストメッセージ テストメッセージ テストメッセージ テストメッセージ", "last_updated" => date_create()->format("Y/m/d H:i:s") ],
		[ "id"=>1, "title" => "トーク2", ],
		[ "id"=>1, "title" => "トーク3", ],
		[ "id"=>1, "title" => "トーク4", ],
		[ "id"=>1, "title" => "トーク5", ],
		[ "id"=>1, "title" => "トーク6", ],
		[ "id"=>1, "title" => "トーク7", ],
		[ "id"=>1, "title" => "トーク8", ],
		[ "id"=>1, "title" => "トーク9", ],
		[ "id"=>1, "title" => "トーク10", ],
		[ "id"=>1, "title" => "トーク11", ],
		[ "id"=>1, "title" => "トーク12", ],
	];
	$talks = new Talks();
	$data = $talks->getAll();
	$res->json($data);
});
$router->get("/api/talk/create", function($req, $res) {
	$title = $req->param("title");
	if ( ! $title ) {
		throw new JsonResErrorException("トーク名を入力してください。");
	}
	$talks = new Talks();
	$talks->insert([
		"title" => $title,
	]);
	$res->json(["success"]);
});
$router->get("/login", function($req, $res) {
	if ( AppUser::getUser() ) {
		// ログイン済みの場合
		$res->redirect("/");
	} else {
		// ログインまだの場合
		$res->render("login", ["title"=>"ログイン"]);
	}
});
$router->get("/login/new-member", function($req, $res) {
	try {
		$users = new Users();
		$users->regist( $req->params() );
		$res->json(["success"]);
	} catch (Exception $e) {
		throw new JsonResErrorException($e->getMessage());
	}
});
$router->get("/logout", function($req, $res) {
	AppUser::clear();
	$res->redirect("/login");
});
// 匿名ログイン
$router->post("/tokumei-login", function($req, $res) {
	if ( $req->param("nickname") != "" ) {
		$nickname = $req->param("nickname");
		AppUser::setUser([
			"nickname" => $nickname,
		]);
		// 匿名ログインをニュースに追加
		$news = new News();
		$news->insert([
			"message" => "匿名ユーザー「{$nickname}」さんがログインしました。",
		]);
		return $res->json(["認証OK"]);
	}
	throw new JsonResErrorException("認証エラー");
});
// 通常ログイン
$router->post("/auth", function($req, $res) {
	$users = new Users();
	$user = $users->findOne([
		"email" => $req->param("email"),
		"password" => md5($req->param("password")),
	]);
	if ( $user ) {
		AppUser::setUser($user);
		// 匿名ログインをニュースに追加
		$nickname = $user["nickname"];
		$news = new News();
		$news->insert([
			"message" => "メンバー「{$nickname}」さんがログインしました。",
		]);
		return $res->json(["認証OK"]);
	}
	throw new JsonResErrorException("認証エラー");
});

try {
	$router->listen();
	
} catch( NotFoundException $e ) {
	$res = $router->getRes();
	$res->json([
		"error" => $e->getMessage(),
	]);
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
