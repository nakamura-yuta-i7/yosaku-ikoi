require("./notification.scss")

module.exports = class {
	constructor() {
		this.close()
		
		this.$html = $(`
			<div class="notification">
				<div class="message"></div>
				<div class="close">
					<i class="material-icons">&#xE5CD;</i>
				</div>
			</div>
		`)
		this.$html.find(".close").on("click", ()=> {
			this.close()
		})
	}
	send(message) {
		this.$html.find(".message").append(message)
		this._bodyAppend()
	}
	_bodyAppend() {
		$("body").append(this.$html)
		this.$html.css({marginTop:"-100px"}).animate({marginTop:0}, 500)
		setTimeout( () => {
			this.close()
		}, 1000 * 60 ) // 10000 * 60 = 1時間
	}
	close() {
		$("body .notification").remove()
	}
}
