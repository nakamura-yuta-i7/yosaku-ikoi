require("./talk_room.scss")
module.exports = class TalkRoom {
	constructor() {
		let Layout = new (require("../common/talk_room_layout/talk_room_layout"))
		this.layout = Layout
		Layout.render()
		
		// １ページに表示するメッセージ上限数
		let limit = 50
		let offset = 0
		
		// メッセージを取得
		let TalkRoomMessages = new (require("./talk_room_messages"))
		TalkRoomMessages.getContent(limit, offset, function(err, $messages) {
			// メッセージを描画
			$messages.forEach(function($message) {
				Layout.addMessage( $message )
			})
			// 追加したら画面下までスクロール
			Layout.scrollBottom()
			
			// このトークルームの合計メッセージ数が表示している数より多ければ
			// [過去のメッセージを表示]リンクを表示
			TalkRoomMessages.getTotal(global.talk_id, function(err, total) {
				if ( total > Layout.getMessageCount() ) {
					limit = limit
					offset = offset + limit
					Layout.showPrevMessagesLink(limit, offset)
				}
			})
		})
		// 新着メッセージをポーリング
		TalkRoomMessages.poolingNewMessage()
		
	}
}
