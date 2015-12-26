require("./talk_room.scss")

let Layout = require("../common/talk_room_layout/talk_room_layout")
let layout = new Layout()
	
$(function() {
	layout.render()
	
	let room = new TalkRoom()
	room.getContent(function(err, content) {
		// チャット内容を描画
		layout.addContent(content)
		// 画面下までスクロール
		$("main").delay(100).animate( {scrollTop:$("main").height()} )
	})
})

class TalkRoom {
	constructor() {
		
	}
	getContent(callback) {
		this.loadMessages(function(err, messages) {
			let content = []
			let i = 0
			messages.forEach(function(m) {
				let img = `<i class="material-icons">&#xE7FD;</i>`
				if ( m.user.img ) {
					img = m.user.img
				}
				i++
				let nickname = `
					<div class="nickname">${m.user.nickname}</div>
				`
				let text = `
					<div class="td text">
						${m.message}
					</div>
				`
				let time = `
					<div class="td time">
						<span>${m.time}</span>
					</div>
				`
				let user_img = `
					<div class="td user_img">
						${img}
					</div>
				`
				let me = ( i % 3 == 1 ? "me" : "" )
				
				
				if ( me != "me" ) {
					var table_content = `
						${user_img}
						<div class="td detail">
							${nickname}
							<div class="table">
								<div class="tr">
									${text}
									${time}
								</div>
							</div>
						</div>
					`
				} else {
					var table_content = `
						<div class="td detail">
							${nickname}
							<div class="table">
								<div class="tr">
									${time}
									${text}
								</div>
							</div>
						</div>
						${user_img}
					`
				}
				let message_area = `
					<div class="table message ${me}" message_id="${m.id}">
						<div class="tr">
							${table_content}
						</div>
					</div>
				`
				content.push( message_area )
			})
			callback(null, content.join("") )
		})
	}
	loadMessages(callback) {
		$.ajax({
			url: "/api/messages",
			method: "get",
			dataType: "json",
			success: function(data) {
				callback(data.err, data.messages)
			}
		})
	}
}
