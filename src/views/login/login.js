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
			
			<div class="entry-new-member">
				<a href="">メンバー登録</a>
				|
				<a href="">パスワードを忘れた場合</a>
			</div>
			
			<div class="comment">
				メンバーでログインすると新着通知、プロフィール、個別メッセージ、トークルーム新規作成などの機能が使えるようになります
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
	
	
	
	// 特定ログイン
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
					let $message = $(`<div class="error">ログインに失敗しました。<br>しばらくしてから再度お試しください。</div>`)
					$(this).find(".error").remove();
					$(this).find(".submit-area").append( $message );
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
		e.preventDefault();
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
