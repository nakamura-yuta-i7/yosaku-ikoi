require("./password-lost-form.scss")

module.exports = new class {
	constructor() {
		
		this.$form = $(`
			<form class="password-lost-form">
				<div class="title">
					<span>パスワード再発行</span>
				</div>
				<input type="text" name="email" placeholder="メールアドレスを入力">
				<input type="password" name="password" placeholder="パスワードを入力">
				<input type="password" name="password-retype" placeholder="パスワードをもう一度入力">
				<input type="submit" value="登録実行">
			</form>
		`)
	}
	getContent() {
		return this.$form
	}
	render() {
		// ガラスぼかし背景表示
		let Overlay = require("../../common/parts/overlay/overlay")
		Overlay.show()
		// ぼかし背景をクリックしても閉じられる
		Overlay.$overlay.on("click", () => {
			this.$form.remove()
		})
		// メンバー登録実行
		this.$form.on("submit", function(e) {
			e.preventDefault()
			$.ajax({
				url: "/login/password-reset",
				data: $(this).serialize(),
				method: "post",
				dataType: "json",
				success: function(data) {
					if (data.error) {
						alert(data.error)
					} else {
						alert("パスワードを再発行しました。\nメールアドレスにログイン情報を送信しました。")
						location.href = ""
					}
				}
			})
		})
		this.$form.css({opacity:0})
		$("body").append( this.$form )
		this.$form.animate({opacity:1}, 300)
	}
}
