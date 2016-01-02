<?php
require dirname(__FILE__) . "/../src/bootstrap.php";

require_once APP_DIR . "src/router.php";
$router = new Router();

# ================================================
# ページ
# ================================================
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
$router->get("/bulletin", function($req, $res) {
	$res->render("index", ["title"=>"掲示板"]);
});
$router->get("/setting", function($req, $res) {
	$res->render("index", ["title"=>"せってい"]);
});
$router->get("/talk_room", function($req, $res) {
	$id = $req->param("id");
	$talks = new Talks();
	$data = $talks->findById($id);
	$res->render("talk_room", $data );
});

# ================================================
# API
# ================================================
# チャットルームのメッセージ一覧
$router->get("/api/messages", function($req, $res) {
	$talk_id = $req->param("talk_id");
	$limit = $req->param("limit");
	$offset = $req->param("offset");
	$messages = new Messages();
	$rows = $messages->findAllByTalkId($talk_id, $limit, $offset);
	$res->json([ "messages"=> $rows ]);
});
# 新着メッセージを取得
$router->get("/api/messages/search", function($req, $res) {
	$messages = new Messages();
	$rows = $messages->search( $req->params() );
	$res->json([ "messages"=> $rows ]);
});
# メッセージ合計数
$router->get("/api/messages/total", function($req, $res) {
	$talk_id = $req->param("talk_id");
	$model = new Messages();
	$model->query("SELECT count(*) AS c FROM messages WHERE talk_id = {$talk_id}");
	$row = $model->fetch();
	$res->json([ "total"=> $row["c"] ]);
});

$router->post("/api/messages/add", function($req, $res) {
	$message = $req->param("message");
	$talk_id = $req->param("talk_id");
	if ( AppUser::isMember() ) {
		// メンバーログインしている場合
		$user_id = AppUser::get("id");
	} else {
		// 匿名ユーザーの場合
		$user_id = NULL;
		$tokumei_user_nickname = AppUser::getUser()["nickname"];
	}
	$time = date_create()->format("H:i");
	$date = date_create()->format("Y-m-d");
	$model = new Messages();
	$postedData = $model->post(compact("talk_id", "user_id", "tokumei_user_nickname", "message", "time", "date"));
	$res->json( $postedData );
});
$router->post("/api/messages/image/add", function($req, $res) {
	# 画像アップロード
	require_once APP_DIR . "src/libs/upload_file_ope.php";
	$file = new UploadFileOpe($_FILES["image"]);
	$file->start();
	$img_big_path = $file->getUploadedBigPath();
	$img_small_path = $file->getUploadedSmallPath();
	# メッセージ基本情報
	$message = $file->getSrcFileName();
	$talk_id = $req->param("talk_id");
	if ( @AppUser::getUser()["id"] ) {
		// メンバーログインしている場合
		$user_id = AppUser::getUser()["id"];
	} else {
		// 匿名ユーザーの場合
		$user_id = NULL;
		$tokumei_user_nickname = AppUser::getUser()["nickname"];
	}
	$time = date_create()->format("H:i");
	$date = date_create()->format("Y-m-d");
	
	$model = new Messages();
	$postedData = $model->post(compact("talk_id", "user_id", "tokumei_user_nickname", 
		"message", "time", "date", "img_big_path", "img_small_path"));
	
	$res->json( $postedData );
});
# 自分自身の情報
$router->get("/api/me", function($req, $res) {
	$res->json( AppUser::getUser() );
});
$router->get("/api/news", function($req, $res) {
	$news = new News();
	$res->json( $news->getLatests() );
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

# ================================================
# ログイン関連
# ================================================
$router->get("/login", function($req, $res) {
	if ( AppUser::getUser() ) {
		// ログイン済みの場合
		$res->redirect("/");
	} else {
		// ログインまだの場合
		$res->render("login", ["title"=>"ログイン"]);
	}
});
// パスワードリセット
$router->get("/login/password-reset", function($req, $res) {
	try {
		$users = new Users();
		$users->resetPassword( $req->params() );
		$res->json(["success"]);
	} catch (Exception $e) {
		throw new JsonResErrorException($e->getMessage());
	}
});
// メンバー登録
$router->get("/login/new-member", function($req, $res) {
	try {
		$users = new Users();
		$users->regist( $req->params() );
		$res->json(["success"]);
	} catch (Exception $e) {
		throw new JsonResErrorException($e->getMessage());
	}
});
// ログアウト
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
		return $res->json(["認証OK"]);
	}
	throw new JsonResErrorException("ニックネームを入力してください。");
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
		return $res->json(["認証OK"]);
	}
	throw new JsonResErrorException("認証エラー");
});

# ================================================
# リクエスト待受
# ================================================
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
	$res->json([
		"error" => $e->getMessage(),
	]);
}

class JsonResErrorException extends ErrorException {}
