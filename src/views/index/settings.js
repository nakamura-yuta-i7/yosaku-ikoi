require("./settings.scss")
module.exports = new class Settings {
	constructor() {
		this.$html = $(`
			<div class="settings">
				<h2>せってい</h2>
			</div>
		`)
		this.$setting_panel = $(`
			<div class="pad5-side">
				<div class="panel">
					<form class="setting-form">
						<h3>トーク</h3>
						<h4>新着メッセージのメール通知を受ける頻度</h4>
						<div class="notification_setting_interval"></div>
					</form>
				</div>
			</div>
		`)
		if ( global.Me.id ) {
			this.$setting_panel.find("form").append( $(`
				<input type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
				 value="設定変更">
			`) )
		}
		this.$setting_panel.find(".notification_setting_interval").append(
			require("./settings/notification_select").getContent()
		)
		this.$html.append(this.$setting_panel)
		
		// 設定変更ボタンをクリックした時
		let $form = this.$html.find(".setting-form")
		$(document).on("submit", ".setting-form", function(e) {
			e.preventDefault()
			$.ajax({
				url: "/api/me/setting/save",
				data: $form.serialize(),
				method: "post",
				dataType: "json",
				success: function(data) {
					if (data.error) return data.error
					global.Me = data;
					console.log( global.Me );
					// トースターで設定変更成功したということを表示
					let $toast = new (require("../common/parts/toast/toast"))("設定を変更しました").$html
					$("body").append( $toast )
				}
			})
		})
	}
	getContent(callback) {
		let $content = this.$html
		callback($content)
	}
}
