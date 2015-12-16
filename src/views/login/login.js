require("./login.scss")

$(function() {
	
	let $logo_img = $(`<img class="site-name logo" src="${require("./logo_ikoi.png")}">`)
	
	let $login_form = $(`
		<form class="login-form" method="post">
			<div class="name">ログイン</div>
			<div>
				<input type="text" placeholder="メールアドレスを入力" name="email">
			</div>
			<div class="hide password-area">
				<input type="password" placeholder="パスワードを入力" name="password">
			</div>
			<div class="submit-area">
				<input type="submit" value="ログイン">
			</div>
		</form>
	`)
	$("body").append($logo_img)
	$("body").append($login_form)
	
	// ログイン認証実行
	$login_form.on("submit", function(e) {
		e.preventDefault();
		$.ajax({
			url: "/auth",
			method: "post",
			data: $(this).serialize(),
			dataType: "json",
			success: function(data) {
				if (data.error) {
					// ログイン失敗
					let $message = $(`<div class="error">ログイン情報が間違っています</div>`)
					$login_form.find(".error").remove();
					$login_form.append( $message );
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
