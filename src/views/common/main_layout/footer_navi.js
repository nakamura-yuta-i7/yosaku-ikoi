require("./footer_navi.scss")
module.exports = new class FooterNavi {
	constructor() {
		this.$html = $(`
			<div class="footer_navi">
				<div class="mdl-grid">
					<div>
						<a href="/">
							<i class="material-icons">&#xE88A;</i>
							<span>ホーム</span>
						</a>
					</div>
					<div>
						<a href="/members">
							<i class="material-icons">&#xE7EF;</i>
							<span>メンバー</span>
						</a>
					</div>
					<div>
						<a href="/talk">
							<i class="material-icons">&#xE0C9;</i>
							<span>トーク</span>
						</a>
					</div>
					<div>
						<a href="/bulletin">
							<i class="material-icons">&#xE8EE;</i>
							<span>掲示板</span>
						</a>
					</div>
					<div>
						<a href="/setting">
							<i class="material-icons">&#xE8B9;</i>
							<span>せってい</span>
						</a>
					</div>
				</div>
			</div>
		`)
		this.setEvent()
	}
	setEvent() {
		let self = this
		this.$html.find("a").on("click", function(e) {
			e.preventDefault()
			// URL書き換え
			let url = $(this).attr("href")
			history.pushState(null, null, url)
			
			// ボタンクリック時のアイコンデザイン変更
			self.$html.find("a").removeClass("color-orange")
			$(this).addClass("color-orange")
		})
	}
}
