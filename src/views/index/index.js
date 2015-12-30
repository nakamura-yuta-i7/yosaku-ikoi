void function initGlobal(global) {
	global.Me = {}
	global.changeUrlAction = changeUrlAction;
}(window)

let layout = require("../common/main_layout/main_layout")
let $progress_bar = $(`<div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>`)

$(function() {
	// リソースの読み込みが完了したら
	
	// レイアウトレンダリング
	$("body").append( layout.$html )
	
	// コンテンツエリア(ヘッダー／フッターに挟まれたエリア)の高さをあわせる
	void function adjustHeight() {
		let height = $("body").height() - $("header").height() - $(".footer_navi").height()
		layout.$html.find(".content-area").height( height )
	}()
	
	// ルーティング設定
	setRouting()
})

function setRouting() {
	// 最初にアクセスした時／リロードした時にページ読み込み用
	changeUrlAction()
	
	// ブラウザの戻るで遷移してきた場合
	if ( window.history && window.history.pushState ) {
		$(window).on("popstate",function(event){
			console.log( "popstate event", arguments );
			
			changeUrlAction()
		})
	}
	
	// URLをpushstateで変化した場合検知
	(function(history){
		window.history.onpushstate = function() {
			changeUrlAction()
		}
		var pushState = history.pushState;
		history.pushState = function(state, title, url) {
			console.log( "pushstate event", arguments )
			pushState.apply(history, arguments)
			
			if (typeof history.onpushstate == "function") {
				console.log( "onpushstate", state )
				history.onpushstate({state: state})
			}
		}
	})(window.history)
}

function changeUrlAction() {
	let url = location.pathname
	// 一度コンテンツを空にする
	layout.$area.html(null)
	
	// プログレスバーを最初に表示
	layout.$area.append( $progress_bar )
	
	setTimeout(function() {
		
		if ( url == "/" ) {
			let Home = require("./home")
			Home.getContent(function($content) {
				layout.setContent( $content )
			})
			document.title = "ホーム : 良作 憩いの掲示板"
		}
		if ( url == "/members" ) {
			let Members = require("./members")
			new Members().getContent(function($content) {
				layout.setContent( $content )
				document.title = "メンバー : 良作 憩いの掲示板"
			})
		}
		if ( url == "/talk" ) {
			let Talk = require("./talk")
			global.Talk = Talk
			new Talk().getContent(function($content) {
				layout.setContent( $content )
				document.title = "トーク : 良作 憩いの掲示板"
			})
		}
		if ( url == "/setting" ) {
			let settings = require("./settings")
			settings.getContent(function($content) {
				layout.setContent( $content )
				document.title = "せってい : 良作 憩いの掲示板"
			})
		}
		layout.resetScrollTop()
		
	}, 500)
}
