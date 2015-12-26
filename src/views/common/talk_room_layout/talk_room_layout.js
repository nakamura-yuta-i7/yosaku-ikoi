require("./talk_room_layout.scss")
module.exports = class TalkRoomLayout {
	constructor() {
		this.chat_panel = require("./footer_chat_panel")
		this.header = require("./header")
		this.$layout = $(`
			<div class="
				mdl-layout
				mdl-js-layout">
				${this.header.html}
				<main class="content-area mdl-layout__content">
				</main>
				${this.chat_panel.html}
			</div>
			<style>
			.mdl-layout__container {
				position: relative;
				background: #efefef;
				max-width: 500px;
				margin:0px auto;
			}
			</style>
		`)
	}
	setContent(html) {
		this.$layout.find(".content-area").append(html)
		return this
	}
	render() {
		$("body").append(this.$layout)
		
		this.chat_panel.setEventListener()
		this.header.setEventListener()
	}
	addContent(html) {
		this.$layout.find(".content-area").append(html)
		return this
	}
}
