require("./style.scss")

module.exports = class {
	constructor(user) {
		this.user = user
		this.overlay = require("../overlay/overlay")
		this.overlay.show()
		this.overlay.$overlay.on("click", () => {
			this.$profile.remove()
		})
		this.render()
	}
	render() {
		
		this.$profile = $(`
			<div class="profile-popup">
				<div
					class="cover-img"
					style="background-image:url(${this.user.img_background});
					">
					<div class="under-shadow"></div>
				</div>
				<div class="img"></div>
				<div class="info">
					<div class="nickname">${this.user.nickname}</div>
					<div class="fullname">${this.user.fullname}</div>
					<div class="message">${this.user.message}</div>
				</div>
				<!-- <div class="last-login-time"></div> -->
			</div>
		`)
		let $img = new (require("../user_img/user_img"))(this.user).$html
		this.$profile.find(".img").append($img)
		$("body").append( this.$profile )
	}
	close() {
		this.$profile.remove()
	}
}
