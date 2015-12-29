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
