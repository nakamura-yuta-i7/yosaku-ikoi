require("./common.scss")

// 定数定義
void function(global) {
	global.POOLING_INTERVAL = 2000
}(window)

// jQuery拡張
$.fn.extend({
	getHTML: function() {
		return $(this).get(0).outerHTML
	}
})
