require("./new-member.scss")
module.exports = new class NewMember {
	constructor() {
		
		this.$form = $(`
			<form class="new-member">
				<div class="title">
					<span>新規メンバー登録</span>
				</div>
				<input type="text" name="fullname" placeholder="氏名を入力">
				<input type="text" name="nickname" placeholder="ニックネームを入力">
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
				url: "/login/new-member",
				data: $(this).serialize(),
				method: "post",
				dataType: "json",
				success: function(data) {
					if (data.error) {
						alert(data.error)
					} else {
						// 会員登録成功
						alert("メンバー登録に成功しました。\nログインします。")
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
