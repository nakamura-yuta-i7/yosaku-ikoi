require("./talk_room.scss")
module.exports = class TalkRoom {
	constructor() {
		let Layout = new (require("../common/talk_room_layout/talk_room_layout"))
		this.layout = Layout
		Layout.render()
		
		// メッセージを取得
		let TalkRoomMessages = new (require("./talk_room_messages"))
		TalkRoomMessages.getContent(function(err, $messages) {
			// メッセージを描画
			$messages.forEach(function($message) {
				Layout.addMessage( $message )
			})
			// 追加したら画面下までスクロール
			Layout.scrollBottom()
		})
		// 新着メッセージをポーリング
		TalkRoomMessages.poolingNewMessage()
	}
}
