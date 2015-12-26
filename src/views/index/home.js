let $my_profile = require("./my_profile")
let News = require("./news")
let $content = $(`
	<div class="page-content">
		<h2>マイページ</h2>
		${$my_profile.getHTML()}
		${(new News()).getHTML()}
	</div>
`)
module.exports = $content
