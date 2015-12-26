module.exports = class MainLayout {
	constructor() {
		this.$layout = $(`
			<div class="
				mdl-layout
				mdl-js-layout">
				${require("./side_panel")}
				${require("./header")}
				<main class="content-area mdl-layout__content">
				</main>
				${require("./footer_navi")}
			</div>
			<style>
			.mdl-layout__container {
				position: relative;
				background: #efefef;
				max-width: 500px;
				margin:0px auto;
			}
			h2 { font-size:13px; color:#333; font-weight: 900; padding:10px; margin:0px; line-height:1em; }
			</style>
		`)
	}
	setContent(html) {
		this.$layout.find(".content-area").append(html)
		return this
	}
}
