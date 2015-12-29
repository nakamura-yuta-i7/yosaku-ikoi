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
					
					<div class="" style="
						position: absolute;
						height:20px;
						width:100px;
						margin:auto;
						top:0;
						bottom:0;
						left:0;
						right:0;
						">
						comming soon
					</div>
					
				</div>
			</div>
		`)
		this.$html.append(this.$setting_panel)
	}
	getContent(callback) {
		let $content = this.$html
		callback($content)
	}
}
