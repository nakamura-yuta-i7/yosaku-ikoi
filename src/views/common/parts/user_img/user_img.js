require("./user_img.scss")

module.exports = class {
	constructor(user) {
		
		let img = ""
		if ( ! user.img ) {
			img = `<div class="user_img"><i class="material-icons">&#xE7FD;</i></div>`
		} else {
			img = `<div class="user_img" style="background-image:url(${user.img})"></div>`
		}
		this.$html = $(img)
	}
}
