require("./home.scss")

$(function() {
	let $header = $(`
		<header>
			<span>憩いの掲示板</span>
		</header>
	`)
	let $title = $(``)
	let $news = $(``)
	let $navi_bar = $(``)
	
	$("body").append($header)
	$("body").append($title)
	$("body").append($news)
	$("body").append($navi_bar)
})
