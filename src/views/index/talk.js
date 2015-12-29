require("./talk.scss")

module.exports = class Talk {
	constructor() {
		this.$content = $(`
			<div class="talk-area">
				<a class="talk-add" id="talk-add" href="#">
					<div id="tt1" class="icon material-icons">add</div>
					<span>新しいトークを追加</span>
				</a>
				<h2>トーク</h2>
				<div class="pad5-side">
					<div class="talk-list">
					</div>
				</div>
			</div>
		`)
		this.$content.find(".talk-add").on("click", function(e) {
			e.preventDefault()
			
			let $form = require("./talk_add_form").$html
			let dialog = require("../common/dialog")
			new dialog().render( $form )
			$form.find("input[type=text]").focus()
		})
	}
	static closeModal() {
		$(".modal-overlay").trigger("click")
	}
	getContent(callback) {
		$.ajax({
			url: "/api/talk/list",
			method: "get",
			dataType: "json",
			success: (rows) => {
				rows.forEach((talk) => {
					
					let $button = $(`
						<a class="talk-room table" href="/talk_room?id=${talk.id}">
							<div class="tr">
								<div class="icon-area td">
									<span class="mdl-badge" data-badge="${talk.unread_count}"></span>
									<i class="material-icons">&#xE0B7;</i>
								</div>
								<div class="detail td">
									<div class="table">
										<div class="tr">
											<div class="title td ">
												${talk.title}
											</div>
											<div class="last-updated td">${talk.last_updated}</div>
										</div>
										<div class="tr">
											<div class="last-message td">
												<span>${talk.last_message}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</a>
					`)
					this.$content.find(".talk-list").append( $button )
				})
				callback(this.$content)
			}
		})
	}
}
