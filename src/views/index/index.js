void function initGlobal(global) {
	global.Me = {}
	global.changeUrlAction = changeUrlAction
}(window)

let layout = require("../common/main_layout/main_layout")
let $progress_bar = $(`<div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>`)

$(function() {
	// リソースの読み込みが完了したら
	
	// レイアウトレンダリング
	$("body").append( layout.$html )
	
	// コンテンツエリア(ヘッダー／フッターに挟まれたエリア)の高さをあわせる
	function adjustHeight() {
		let height = $("body").height() - $("header").height() - $(".footer_navi").height()
		layout.$html.find(".content-area").height( height )
	}
	adjustHeight()
	global.addWindowResizeFunction( adjustHeight )
	
	// ルーティング設定
	setRouting()
	
	// 新着メッセージをポーリング
	poolingNewMessage()
	
})

function poolingNewMessage() {
	let datetime = moment().format("YYYY-MM-DD HH:mm:ss")
	
	setInterval(function() {
		$.ajax({
			url: "/api/messages/search",
			data: {
				datetime,
			},
			dataType: "json",
			success: function(data) {
				if (data.error) return console.log( data.error );
				
				if ( data.messages.length == 0 ) return false;
				
				console.log( "new message", data );
				
				// 新着メッセージがあったことを通知
				if ( location.pathname == "/talk" ) {
					// トーク一覧ページだったらリロードで良いことにする
					location.reload()
				} else {
					// メッセージ表示で通知する
					let notification = new (require("../common/parts/notification/notification"))
					let message = 
						`新しいメッセージがあります。<br>
						${data.messages[0].message}`
					notification.$html.find(".message").on("click", (e)=>{
						$(".footer_navi a[href='/talk']").trigger("click")
						notification.close()
					})
					notification.send(message)
				}
				
				// 新着メッセージ検索用時刻を更新
				datetime = moment().add(1, 'seconds').format("YYYY-MM-DD HH:mm:ss")
			},
		})
	}, global.POOLING_INTERVAL )
}

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
			document.title = "ホーム : 与作 憩いの掲示板"
		}
		if ( url == "/members" ) {
			let Members = require("./members")
			new Members().getContent(function($content) {
				layout.setContent( $content )
				document.title = "メンバー : 与作 憩いの掲示板"
			})
		}
		if ( url == "/talk" ) {
			let Talk = require("./talk")
			global.Talk = Talk
			new Talk().getContent(function($content) {
				layout.setContent( $content )
				document.title = "トーク : 与作 憩いの掲示板"
			})
		}
		if ( url == "/bulletin" ) {
			let Talk = require("./talk")
			let bulletin = require("./bulletin")
			new bulletin().getContent(function($content) {
				layout.setContent( $content )
				document.title = "与作 憩いの掲示板"
			})
		}
		if ( url == "/setting" ) {
			let settings = require("./settings")
			settings.getContent(function($content) {
				layout.setContent( $content )
				document.title = "せってい : 与作 憩いの掲示板"
			})
		}
		layout.resetScrollTop()
		
	}, 500)
}
