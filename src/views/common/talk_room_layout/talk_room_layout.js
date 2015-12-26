require("./talk_room_layout.scss")

module.exports = class TalkRoomLayout {
	constructor() {
		this.chat_panel = require("./footer_chat_panel")
		this.header = require("./header")
		this.$layout = $(`
			<div class="container">
				${this.header.html}
				<main class="content-area">
				</main>
				${this.chat_panel.html}
			</div>
			
			<style>
			.container {
				position: relative;
				background: #efefef;
				width: 100%;
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
		
		let $content_area = this.$layout.find(".content-area")
		let height = $("body").height() - $("header").outerHeight() - $(".footer_chat_panel").outerHeight()
		$content_area.outerHeight( height )
		$content_area.css({top: $("header").outerHeight() })
		
		this.chat_panel.setEventListener()
		this.header.setEventListener()
	}
	addContent(html) {
		this.$layout.find(".content-area").append(html)
		return this
	}
}
