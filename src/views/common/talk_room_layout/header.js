require("./header.scss")
module.exports = {
	html: `
		<header class="table">
			<div class="tr">
				<div class="td">
					<div class="btn btn-return">
						<i class="material-icons">&#xE408;</i>
					</div>
				</div>
				<div class="td title">
					${global.talk_title}
				</div>
				<div class="td">
					<!-- アルバムメニュー -->
					<div class="btn btn-other-menu mdl-js-button" id="demo-menu-lower-right">
						<i class="material-icons">&#xE5D4;</i>
					</div>
					<!-- その他のメニュー -->
					<ul class="other-menu-items mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
					    for="demo-menu-lower-right">
					  <li disabled class="mdl-menu__item">
							<i class="material-icons">&#xE838;</i>
							<span>スター付きメッセージ一覧</span>
						</li>
					  <li disabled class="mdl-menu__item">
							<i class="material-icons">&#xE3B6;</i>
							<span>写真一覧</span>
						</li>
						<li disabled class="mdl-menu__item">
							<i class="material-icons">&#xE411;</i>
							<span>アルバム</span>
						</li>
						<li class="edit-talk_name mdl-menu__item">
							<i class="material-icons">&#xE254;</i>
							<span>トーク名を修正</span>
						</li>
					</ul>
				</div>
				
			</div>
		</header>
	`,
	setEventListener: function() {
		// 戻るボタン
		$(".btn-return").on("click", function() {
			location.href = "/talk"
		})
		// トーク名編集
		$(".edit-talk_name").on("click", function(e) {
			alert("この機能はまだ開発中です。修正したい方はご要望トークへ連絡お願いします。")
		})
	},
	setTitle: function(title) {
		$("header").find(".title").text(title)
	}
}
