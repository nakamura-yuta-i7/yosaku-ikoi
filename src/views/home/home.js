require("./home.scss")

$(function() {
	let $side_panel = require("./side_panel")
	let $header = require("./header")
	let $footer_navi = require("./footer_navi")
	let $layout = $(`
		<div class="
			mdl-layout
			mdl-js-layout">
			${$side_panel.getHTML()}
			
			${$header.getHTML()}
			<main class="mdl-layout__content">
				${$content.getHTML()}
			</main>
			${$footer_navi.getHTML()}
			
		</div>
	`)
	$("body").append($layout)
})

let $my_profile = require("./my_profile")
let News = require("./news")
let $content = $(`
	<div class="page-content">
		<h2>マイページ</h2>
		${$my_profile.getHTML()}
		${(new News()).getHTML()}
	</div>
`)
