module.exports = class MainLayout {
	constructor() {
		let side_panel = require("./side_panel")
		side_panel.setEvent()
		this.$html = $(`
			
			${side_panel.html}
			
			<div class="container">
				<div class="main-layout">
						${require("./header")}
						<main class="content-area">
						</main>
						${require("./footer_navi")}
				</div>
			</div>
			
			<style>
			.container {
				width: 100%;
				max-width: 500px;
				margin: 0px auto;
				-webkit-overflow-scrolling: touch;
			}
			.main-layout {
				position: fixed;
				width: 100%;
				max-width: 500px;
				top: 44px;
				background: #efefef;
			}
			.content-area {
				width: 100%;
				max-width: 500px;
				overflow: scroll;
			}
			h2 { font-size:13px; color:#333; font-weight: 900; padding:10px; margin:0px; line-height:1em; }
			</style>
			
		`)
		this.$area = this.$html.find(".content-area")
	}
	setContent($html) {
		this.$area.html(null)
		this.$area.append($html)
		return this
	}
	resetScrollTop() {
		this.$area.scrollTop(0)
	}
}
