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
		
		// 他のトークルームの新着メッセージをポーリング
		poolingNewMessage()
	}
}


function poolingNewMessage() {
	let datetime = moment().format("YYYY-MM-DD HH:mm:ss")
	
	setInterval(function() {
		$.ajax({
			url: "/api/messages/search",
			data: {
				datetime,
			},
			dataType: "json",
			success: function(data) {
				if (data.error) return console.log( data.error );
				
				if ( data.messages.length == 0 ) return false;
				
				console.log( "new message", data );
				
				// 新着メッセージがあったことを通知
				let m = data.messages[0]
				if ( m.talk_id == global.talk_id ) {
					// 今いるトークルームだったら何もしない
					
				} else {
					// 違うトークルームだったら
					// メッセージ表示で通知する
					let notification = new (require("../common/parts/notification/notification"))
					let message = 
						`新しいメッセージがあります。<br>
						${m.message}`
					notification.$html.find(".message").on("click", (e)=>{
						location.href = `/talk`
					})
					notification.send(message)
				}
				
				// 新着メッセージ検索用時刻を更新
				datetime = moment().add(1, 'seconds').format("YYYY-MM-DD HH:mm:ss")
			},
		})
	}, global.POOLING_INTERVAL )
}
