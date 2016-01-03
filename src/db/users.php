<?php
require_once dirname(__FILE__) . "/yosaku_ikoi_abstract.php";
class Users extends YosakuIkoiAbstract {
	
	// user_id をキーに全ユーザーを返す
	function getAll() {
		$users = [];
		foreach ( $this->findAll() as $user ) {
			$users[$user["id"]] = $user;
		}
		return $users;
	}
	
	function editUser($user_id, $values) {
		# 必須項目チェック
		if ( ! filter_var($values["email"], FILTER_VALIDATE_EMAIL) ) {
			throw new ErrorException("メールアドレスの指定に誤りがある可能性があります。");
		}
		if (
			! $values["fullname"] || 
			! $values["nickname"] || 
			! $values["email"]
		) {
			throw new ErrorException("入力されていない項目があります。");
		}
		
		if ( $_FILES["img"]["size"] > 0 ) {
			require_once APP_DIR . "src/libs/upload_profile_img_ope.php";
			$file = new UploadProfileImgOpe($_FILES["img"]);
			$file->up_dir = "uploads/profile/user/{$user_id}/img";
			$file->start();
			$img = $file->getImgPath();
			$values["img"] = $img;
		}
		if ( $_FILES["img_background"]["size"] > 0 ) {
			require_once APP_DIR . "src/libs/upload_profile_img_ope.php";
			$file = new UploadProfileImgOpe($_FILES["img_background"]);
			$file->up_dir = "uploads/profile/user/{$user_id}/img_background";
			$file->start();
			$img = $file->getImgPath();
			$values["img_background"] = $img;
		}
		$this->save($values, ["id"=>$user_id]);
	}
	
	// パスワード再発行
	function resetPassword(Array $data) {
		$email = $data["email"];
		$password = $data["password"];
		$password_retype = $data["password-retype"];
		if (
			! $email ||
			! $password ||
			! $password_retype
		) {
			throw new ErrorException("すべての情報を入力してください。");
		}
		$emailFound = $this->findOne(compact("email"));
		$user = $emailFound;
		if ( ! $emailFound ) {
			throw new ErrorException("メンバー登録がされていないメールアドレスです。\nメンバー登録をお願いします。");
		}
		if ( strlen($password) < 4 ) {
			throw new ErrorException("パスワードは４文字以上必要です。");
		}
		if ( $password != $password_retype ) {
			throw new ErrorException("再入力したパスワードが間違っています。");
		}
		$id = $user["id"];
		$password_original = $password;
		$password = md5($password);
		
		try {
			// 再登録
			$this->save(compact("password"), compact("id"));
			
			// パスワード再発行メールを送る
			$from = FROM_EMAIL;
			$to = $email;
			$subject = "パスワードをリセットしました。＜与作:憩いの掲示板＞";
			$email = $to;
			
			$nickname = $user["nickname"];

			$body = "{$nickname} さん、こんにちは<br>
				ログイン情報は以下になります。<br>
				<br>
				email:<br>
				{$email}<br>
				<br>
				password: <br>
				{$password_original}<br>
				<br>
				＜与作:憩いの掲示板＞<br>
				http://ikoi.yosaku.info<br>
			";
			$params = [
				"to" => $to,
				"from" => $from,
				"subject" => $subject,
				"body" => $body,
			];
			sendMail($params);
			
		} catch ( Exception $e) {
			
			throw new ErrorException("再発行メールの送信でエラーがありました。管理者にご連絡ください。  error: ".$e->getMessage() );
		}
	}
	
	// 新規メンバー登録ロジック
	function regist(Array $user_data) {
		$data = $user_data;
		$emailFound = $this->findOne([
			"email" => $data["email"]
		]);
		if ( $emailFound ) {
			throw new ErrorException("既に登録があるメールアドレスです。パスワードを忘れた場合、再発行できます。");
		}
		if ( ! filter_var($data["email"], FILTER_VALIDATE_EMAIL) ) {
			throw new ErrorException("メールアドレスの指定に誤りがある可能性があります。");
		}
		if (
			! $data["fullname"] || 
			! $data["nickname"] || 
			! $data["email"] || 
			! $data["password"] || 
			! $data["password-retype"]
		) {
			throw new ErrorException("入力されていない項目があります。");
		}
		if ( strlen($data["password"]) < 4 ) {
			throw new ErrorException("パスワードは４文字以上必要です。");
		}
		if ( $data["password"] != $data["password-retype"] ) {
			throw new ErrorException("再入力したパスワードが間違っています。");
		}
		$data["created"] = date_create()->format("Y-m-d H:i:s");
		
		$password = $data["password"];
		$data["password"] = md5($data["password"]);
		unset($data["password-retype"]);
		
		try {
			$this->beginTransaction();
			// 登録
			$this->insert($data);
			$user_id = $this->getLastInsertId();
			$data = $this->findById($user_id);
			
			// 新規メンバーに登録完了メールを送る
			$from = FROM_EMAIL;
			$to = $data["email"];
			$subject = "新規メンバー登録が完了しました。＜与作:憩いの掲示板＞";
			
			$email = $to;
			$password = $password;
			$nickname = $data["nickname"];

			$body = "{$nickname} さん、メンバー登録ありがとうございます。<br>
				ログイン情報は以下になります。<br>
				<br>
				email:<br>
				{$email}<br>
				<br>
				password: <br>
				{$password}<br>
				<br>
				＜与作:憩いの掲示板＞<br>
				http://ikoi.yosaku.info<br>
			";
			$params = [
				"to" => $to,
				"from" => $from,
				"subject" => $subject,
				"body" => $body,
			];
			sendMail($params);
			
			// ログインしたことにする
			AppUser::setUser($data);
			
			// ニュースに追加
			$news = new News();
			$news->insert([
				"message" => "{$nickname}さんが新しくメンバーに追加されました。",
				"created" => date_create()->format("Y-m-d H:i:s"),
			]);
			
			$this->commit();
			
		} catch ( Exception $e) {
			
			$this->rollBack();
			throw new ErrorException("登録完了メールの送信でエラーがありました。管理者にご連絡ください。  error: ".$e->getMessage() );
		}
		
	}
}
