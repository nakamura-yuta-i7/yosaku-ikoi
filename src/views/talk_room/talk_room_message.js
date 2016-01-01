module.exports = class TalkRoomMessage {
	getContent() {
		return this.$message_area
	}
	// m: メッセージデータを渡してnewすること
	constructor(m) {
		this.$message_area = null
		
		let img = `<i class="material-icons">&#xE7FD;</i>`
		if ( m.user && m.user.img ) {
			img = m.user.img
		}
		let nick = m.user.id ? m.user.nickname : m.tokumei_user_nickname
		let nickname = `
			<div class="nickname">${nick}</div>
		`
		
		// 画像がアップされているなら画像メッセージにする
		let text = ""
		if ( m.img_small_path ) {
			text = `
				<div class="td text img">
					<a href="${m.img_big_path}" class="click-view-large">
						<img src="${m.img_small_path}" width="120">
					</a>
					<a href="${m.img_big_path}" class="click-view-large left">
						<i class="material-icons">&#xE0BA;</i>
						拡大
					</a>
					<a href="${m.img_big_path}" target="_blank" class="right">
						<i class="material-icons">&#xE89E;</i>
						別表示
					</a>
					<div class="clear"></div>
				</div>
			`
		} else {
			// 画像なしの場合
			text = `
				<div class="td text">
					${m.message}
				</div>
			`
		}
		
		let time_str = m.time
		if ( moment().format("YYYY-MM-DD") > m.date ) {
			time_str = moment(m.created).format("YYYY/MM/DD<br>HH:mm")
		}
		let time = `
			<div class="td time">
				<span>${time_str}</span>
			</div>
		`
		let user_img = `
			<div class="td user_img">
				${img}
			</div>
		`
		let is_me = global.Me.id == m.user_id
		let me = is_me ? "me" : ""
		
		if ( ! is_me ) {
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
		this.$message_area = $(`
			<div class="table message ${me}" message_id="${m.id}">
				<div class="tr">
					${table_content}
				</div>
			</div>
		`)
		this.$message_area.find(".click-view-large").on("click", function(e) {
			e.preventDefault()
			let overlay = require("../common/parts/overlay/overlay")
			overlay.show()
			
			let img_path = m.img_big_path
			let click_image = new (require("./click_view_large"))(img_path)
			click_image.render()
			
			click_image.$html.on("click", function(e) {
				overlay.hide()
				click_image.close()
			})
		})
	}
}
