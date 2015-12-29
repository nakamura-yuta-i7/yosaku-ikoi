require("./talk_add_form.scss")
module.exports = new class {
	constructor() {
		this.$html = $(`
			<form class="add-talk-form">
				<div class="title">
					<span>新しいトークを作ります</span>
				</div>
				<div style="margin-bottom: 10px;">
					<input class="" type="text" id="qwer" name="title" placeholder="トーク名を入力してください">
				</div>
				<div>
					<button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
						決定
					</button>
					<button type="reset" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
						キャンセル
					</button>
				</div>
			</form>
		`)
		
		this.$html.on("submit", function(e) {
			e.preventDefault()
			$.ajax({
				url: "/api/talk/create",
				method: "post",
				dataType: "json",
				data: $(this).serialize(),
				success: function(data) {
					if ( data.error ) {
						alert(data.error)
					} else {
						global.changeUrlAction()
						Talk.closeModal()
					}
				}
			})
		})
		this.$html.on("click", "[type=reset]", function(e) {
			Talk.closeModal()
		})
	}
}
