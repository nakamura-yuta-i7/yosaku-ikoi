require("./toast.scss")
module.exports = class {
	constructor($message) {
		this.$html = $(`
			<div class="toast">
				<span class="message"></span>
			</div>
		`)
		this.$html.find(".message").append($message)
		
		let remove_timeout = 3000
		setTimeout( ()=> {
			this.$html.animate({
				top: 60
			}, {
				duration: 500,
				easing: "easeOutCubic",
			} ).delay( remove_timeout ).queue(function(next) {
				$(this).animate({
					opacity: 0,
				}, {
					duration: 500,
					easing: "easeOutCubic",
				}).delay(500).queue(function(next) {
					$(this).remove()
					next()
				})
				next()
			})
		}, 0)
	}
}
