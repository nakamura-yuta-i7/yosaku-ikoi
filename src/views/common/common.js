require("./common.scss")

$.fn.extend({
	getHTML: function() {
		return $(this).get(0).outerHTML
	}
})
