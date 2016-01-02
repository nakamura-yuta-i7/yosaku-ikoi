require("./login.scss")

$(function() {
	
	let $logo_img = $(`<img class="site-name logo" src="${require("./logo_ikoi.png")}">`)
	
	let $tokumei_login_form = $(`
		<form class="tokumei-login" method="post">
			<div class="name">匿名ログイン</div>
			
			<div class="nickname-area">
				<input type="text" name="nickname" placeholder="ニックネームを入力">
			</div>
			<div class="submit-area">
				<input type="submit" value="ログイン">
			</div>
			
			<div class="comment">
				特定ログインでは一部の機能に制限があります。
			</div>
		</form>
	`)
	
	let $login_form = $(`
		<form class="login-form" method="post">
		
			<div class="name">メンバーログイン</div>
			
			<div>
				<input type="text" placeholder="メールアドレスを入力" name="email">
			</div>
			<div class="hide password-area">
				<input type="password" placeholder="パスワードを入力" name="password">
			</div>
			<div class="submit-area">
				<input type="submit" value="ログイン">
			</div>
			
			<div class="login-other-menu">
				<a href="" class="entry-new-member">メンバー登録</a>
				|
				<a href="" class="password-lost">パスワードを忘れた場合</a>
			</div>
			
			<div class="comment">
				メンバーになると新着メッセージ通知、未読メッセージ数表示、プロフィール編集などの機能が使えるようになります
			</div>
			
		</form>
	`)
	
	let $layout = $(`
		<div class="layout">
		</div>
	`)
	$layout.append($logo_img)
	$layout.append($tokumei_login_form)
	$layout.append($login_form)
	$("body").append($layout)
	
	
	
	// メンバー登録リンククリックした時
	let $link_new_member = $(".entry-new-member")
	$link_new_member.on("click", function(e) {
		e.preventDefault()
		
		// 登録フォーム表示
		let NewMemberForm = require("./new-member/new-member")
		NewMemberForm.render()
	})
	
	// パスワードを忘れた場合
	let $password_lost = $(".password-lost")
	$password_lost.on("click", function(e) {
		e.preventDefault()
		
		// メールアドレス入力フォーム表示
		let password_reset_form = require("./password-lost/password-lost-form")
		password_reset_form.render()
	})
	
	
	// 匿名ログイン
	$tokumei_login_form.on("submit", function(e) {
		e.preventDefault()
		$.ajax({
			url: "/tokumei-login",
			method: "post",
			data: $(this).serialize(),
			dataType: "json",
			context: this,
			success: function(data) {
				if (data.error) {
					// ログイン失敗
					let $message = $(`<div class="error"></div>`)
					$message.append(data.error)
					$(this).find(".error").remove()
					$(this).find(".submit-area").append( $message )
					setTimeout( () => $message.animate({opacity:0}, 1000, "easeOutQuint") , 1500)
					setTimeout( () => $message.remove() , 2500)
				} else {
					// ログイン成功
					location.href = "/"
				}
			}
		})
	})
	
	
	
	// ログイン認証実行
	$login_form.on("submit", function(e) {
		e.preventDefault()
		$.ajax({
			url: "/auth",
			method: "post",
			data: $(this).serialize(),
			dataType: "json",
			context: this,
			success: function(data) {
				if (data.error) {
					// ログイン失敗
					let $message = $(`<div class="error">ログイン情報が間違っています</div>`)
					$(this).find(".error").remove();
					$(this).find(".submit-area").append( $message );
					setTimeout( () => $message.animate({opacity:0}, 1000, "easeOutQuint") , 1500)
					setTimeout( () => $message.remove() , 2500)
				} else {
					// ログイン成功
					location.href = "/"
				}
			}
		});
	})
})
