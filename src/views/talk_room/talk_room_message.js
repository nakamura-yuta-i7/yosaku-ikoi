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
	}
}
