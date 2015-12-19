let $footer_member = $(`
	<div>
		<a href="/members">
			<i class="material-icons">&#xE7EF;</i>
			<span>メンバー</span>
		</a>
	</div>
`)
let $footer_talk = $(`
	<div>
		<a href="/talk">
			<i class="material-icons">&#xE0C9;</i>
			<span>トーク</span>
		</a>
	</div>
`)
let $footer_setting = $(`
	<div>
		<a href="/setting">
			<i class="material-icons">&#xE8B9;</i>
			<span>せってい</span>
		</a>
	</div>
`)

require("./footer_navi.scss")
let $footer_navi = $(`
	<div class="footer_navi mdl-grid">
		${$footer_member.getHTML()}
		${$footer_talk.getHTML()}
		${$footer_setting.getHTML()}
	</div>
`)
module.exports = $footer_navi
