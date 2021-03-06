require("./overlay.scss")

class Overlay {
	constructor() {
		let self = this
		this.$blurTarget = $(".layout, .container")
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
	hide() {
		this.$overlay.trigger("click")
	}
}

module.exports = new Overlay()
