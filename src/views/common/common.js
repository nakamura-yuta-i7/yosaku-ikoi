require("./common.scss")

void function initGlobal(global) {
	// 共通定数定義
	global.POOLING_INTERVAL = 2000
	
	// 共通関数
	// ウィンドウリサイズで起動する関数を追加
	global.addWindowResizeFunction = function(func) {
		
		var timer = false;
		$(window).resize(function() {
			if (timer !== false) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				console.log('resized.  func:', func.name);
				func();
			}, 200);
		});
	};
	
}(window)

// jQuery拡張
$.fn.extend({
	getHTML: function() {
		return $(this).get(0).outerHTML
	}
})
