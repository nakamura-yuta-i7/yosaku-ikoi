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
						<th class="img">アイコン</th>
						<th class="name">
							<span class="nickname">ニックネーム</span>
							<br>
							<spna class="fullname">氏名</span>
						</th>
						<th class="message">
							ひとことメッセージ
						</th>
					</tr>
				`)
				members.forEach((member) => {
					console.log( member );
					let $img = new (require("../common/parts/user_img/user_img"))(member, true).$html
					
					let $tr = $(`
						<tr>
							<td class="img"></td>
							<td class="name">
								<span class="nickname">${member.nickname}</span>
								<br>
								<span class="fullname">${member.fullname}</span>
							</td>
							<td class="message">${ member.message || "" }</td>
						</tr>
					`)
					$tr.find(".img").append($img)
					$table.append( $tr )
				})
				callback(this.$content)
			}
		})
	}
}
