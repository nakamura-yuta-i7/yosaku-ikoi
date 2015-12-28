require("./overlay.scss")

class Overlay {
	constructor() {
		let self = this
		this.$blurTarget = $(".layout")
		this.$overlay = $(`
			<div class="overlay"></div>
		`)
		$("body").append(this.$overlay)
		this.$overlay.on("click", function() {
			$(this).hide()
			self.$blurTarget.removeClass("blur")
		})
	}
	show() {
		this.$overlay.show()
		this.$blurTarget.addClass("blur")
	}
}

module.exports = new Overlay()
