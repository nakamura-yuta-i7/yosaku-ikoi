require("./main_layout.scss")

module.exports = new class MainLayout {
	constructor() {
		let side_panel = require("./side_panel")
		side_panel.setEvent()
		let footer_navi = require("./footer_navi")
		this.$html = $(`
			
			${side_panel.html}
			
			<div class="container">
				<div class="main-layout">
						${require("./header")}
						<main class="content-area">
						</main>
				</div>
			</div>
		`)
		this.$area = this.$html.find(".content-area")
		this.$main_layout = this.$html.find(".main-layout")
		this.$main_layout.append( footer_navi.$html )
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
