<?php
require_once dirname(__FILE__) . "/yosaku_ikoi_abstract.php";
class Users extends YosakuIkoiAbstract {
	
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
		$data["password"] = mb5($data["password"]);
		try {
			// 新規メンバーに登録完了メールを送る
			
		} catch ( Exception $e) {
			throw new ErrorException("登録完了メールの送信でエラーがありました。管理者にご連絡ください。");
		}
		$this->insert($data);
	}
}
