let MainLayout = require("../common/main_layout/main_layout")
let $layout = (new MainLayout()).$layout

$(function() {
	$("body").append($layout)
	changeUrlAction(location.pathname)
	// ブラウザの戻るで遷移してきた場合
	if ( window.history && window.history.pushState ) {
		$(window).on("popstate",function(event){
			changeUrlAction(location.pathname)
		});
	}
})

function changeUrlAction(url) {
	if ( url == "/" ) {
		let $home = require("./home")
		$layout.find(".content-area").html(null).append( $home.getHTML() )
		document.title = "ホーム : 良作 憩いの掲示板"
	}
	if ( url == "/members" ) {
		let Members = require("./members")
		new Members().getContent(function($content) {
			$layout.find(".content-area").html(null).append( $content )
			document.title = "メンバー : 良作 憩いの掲示板"
		})
	}
	if ( url == "/talk" ) {
		let Talk = require("./talk")
		new Talk().getContent(function($content) {
			$layout.find(".content-area").html(null).append( $content )
			document.title = "トーク : 良作 憩いの掲示板"
		})
	}
	if ( url == "/setting" ) {
		let Members = require("./members")
		new Members().getContent(function($content) {
			$layout.find(".content-area").html(null).append( $content )
			document.title = "せってい : 良作 憩いの掲示板"
		})
	}
}

let $footer_navi = $layout.find(".footer_navi")
$footer_navi.find("a").on("click", function(e) {
	let url = $(this).attr("href")
	history.pushState(null, null, url)
	changeUrlAction(url)
	e.preventDefault()
})
