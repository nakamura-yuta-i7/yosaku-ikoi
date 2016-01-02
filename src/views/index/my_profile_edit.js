require("./my_profile_edit.scss")

module.exports = class {
	constructor() {
		this.$html = $(`
			<form class="my-profile-edit-form">
			
				<h2>プロフィールを編集</h2>
				
				<div style="margin-bottom:20px;">

					<h3>アイコン写真</h3>
					<div class="current-img"></div>
					<input type="file" name="img">
					
					<div style="height:5px;"></div>
					
					<h3>背景写真</h3>
					<div class="current-img-background"></div>
					<input type="file" name="img_background">
					
					<div style="height:5px;"></div>
					
					<h3>ひとことメッセージ</h3>
					<input type="text" name="message" value="${ global.Me.message || "" }">
					
					<h3>ニックネーム</h3>
					<input type="text" name="nickname" value="${global.Me.nickname}">
					
					<h3>ログインメールアドレス</h3>
					<input type="text" name="email" value="${global.Me.email}">
					
					<h3>氏名</h3>
					<input type="text" name="fullname" value="${global.Me.fullname}">
					
					<h3>住所</h3>
					<input type="text" name="address" value="${ global.Me.address || "" }">
					
				</div>
				
				<div class="tr">
					<div class="td">
						<input type="submit" value="登録実行" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
					</div>
					<div class="td pad5-side">
						<input type="reset" value="キャンセル" class="mdl-button mdl-js-button">
					</div>
				</div>
				
			</form>
		`)
		this.$html.on("submit", (e)=>{
			e.preventDefault()
			let $form = this.$html
			this.ajaxSave($form)
		})
		this.$html.find("input[type=reset]").on("click", (e)=>{
			this.overlay.hide()
			this.closeForm()
		})
	}
	ajaxSave($form) {
		
		var formData = new FormData($form[0]);
		$.ajax({
			url: "/api/me/edit",
			method: "post",
			dataType: "json",
			data: formData,
			contentType: false,
			processData: false,
			xhr: function() {
				var myXhr = $.ajaxSettings.xhr();
				if( myXhr.upload ){
						myXhr.upload.addEventListener(
							'progress',
							progressHandlingFunction, false);
				}
				function progressHandlingFunction(data) {
					let per = ( data.loaded / data.total ) * 100
					console.log( per + "%" )
				}
				return myXhr;
			},
			success: function(data) {
				if (data.error) return alert(data.error)
				alert("編集が成功しました。")
				location.reload()
			},
			error: function() {
				console.log("ERROR", arguments);
				alert("ERROR.  管理者に連絡してください...")
			},
		})
	}
	showForm() {
		this.overlay = require("../common/parts/overlay/overlay")
		this.overlay.show()
		this.overlay.$overlay.on("click", () => {
			this.closeForm()
		})
		$("body").append(this.$html)
	}
	closeForm() {
		this.$html.remove()
	}
}
