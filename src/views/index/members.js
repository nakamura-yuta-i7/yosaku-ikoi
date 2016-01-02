require("./members.scss")
module.exports = class Members {
	constructor() {
		this.$content = $(`
			<div class="members-area">
				<h2>メンバー</h2>
				<div class="pad5-side">
					<table class="members mdl-data-table mdl-shadow--2dp" style="width:100%;">
					</table>
				</div>
				<div class="pad5">
					<div class="comment panel">
						メンバーは新着メッセージ通知、未読メッセージ数表示、プロフィール編集などの機能が利用できます。
					</div>
				</div>
			</div>
		`)
	}
	getContent(callback) {
		$.ajax({
			url: "/api/members",
			method: "get",
			dataType: "json",
			success: (members) => {
				let $table = this.$content.find("table")
				$table.append(`
					<tr>
						<th class="img">img</th>
						<th class="name">
							<span class="nickname">nickname</span>
							<br>
							<spna class="fullname">name</span>
						</th>
						<th class="message">
							message
						</th>
					</tr>
				`)
				members.forEach((member) => {
					let img = ( member.img ? 
						`<i class="material-icons">&#xE7FD;</i>` :
						`<i class="material-icons">&#xE7FD;</i>`
					)
					let $tr = $(`
						<tr>
							<td class="img">${img}</td>
							<td class="name">
								<span class="nickname">${member.nickname}</span>
								<br>
								<span class="fullname">${member.fullname}</span>
							</td>
							<td class="message">${ member.message || "" }</td>
						</tr>
					`)
					$table.append( $tr )
				})
				callback(this.$content)
			}
		})
	}
}
