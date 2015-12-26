module.exports = class Members {
	constructor() {
		this.$content = $(`
			<div class="members-area">
				<h2>メンバー</h2>
				<div class="pad5-side">
					<table class="members mdl-data-table mdl-shadow--2dp" style="width:100%;">
					</table>
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
				members.forEach((member) => {
					let $tr = $(`
						<tr>
							<td>${member.name}</td>
							<td>${member.nickname}</td>
							<td>${member.email}</td>
						</tr>
					`)
					this.$content.find("table").append( $tr )
				})
				callback(this.$content)
			}
		})
	}
}
