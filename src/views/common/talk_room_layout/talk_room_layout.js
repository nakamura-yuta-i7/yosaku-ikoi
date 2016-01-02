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
		`)
		this.$area = this.$layout.find(".content-area")
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
	scrollBottom() {
		$("main").delay(100).animate( {scrollTop: $("main").get(0).scrollHeight*2 }, 700 )
	}
	getMessageCount() {
		return this.$area.find(".message").length
	}
	showPrevMessagesLink(limit, offset) {
		let $link = $(`<a class="show-prev-messages"
			href="/api/messages"
			talk_id="${global.talk_id}"
			limit="${limit}"
			offset="${offset}">これより過去のメッセージを表示</a>`)
			
		this.$area.prepend( $link )
		// 過去のメッセージ表示リンクをクリックした時
		$link.on("click", (e) => {
			e.preventDefault()
			$.ajax({
				url: $link.attr("href"),
				data: {
					talk_id: $link.attr("talk_id"),
					limit: $link.attr("limit"),
					offset: $link.attr("offset")
				},
				dataType: "json",
				success: (data) => {
					if (data.error) return alert(data.error)
					if (data.messages.length == 0) {
						$link.hide()
					}
					let offset_next = Number($link.attr("offset")) + Number($link.attr("limit"))
					$link.attr("offset", offset_next )
					
					let TalkRoomMessage = require("../../talk_room/talk_room_message")
					data.messages.reverse()
					data.messages.forEach((m)=>{
						let message = new TalkRoomMessage(m)
						// 前に入れる
						global.TalkRoom.layout.addMessage( message.getContent(), true )
					})
				}
			})
		})
	}
	// $prepend_flag : 前に入れるかどうか
	addMessage( $message, $prepend_flag = false ) {
		
		let message_ids = []
		this.$area.find(".message").each(function() {
			message_ids.push( $(this).attr("message_id") )
		})
		// 重複しないように追加する
		let message_id = $message.attr("message_id")
		if ( ! _.contains(message_ids, message_id) ) {
			if ( $prepend_flag ) {
				// 前に入れる
				this.$area.prepend( $message )
			} else {
				// 後ろに入れる
				this.$area.append( $message )
			}
			message_ids.push( message_id )
		}
		return this
	}
}
