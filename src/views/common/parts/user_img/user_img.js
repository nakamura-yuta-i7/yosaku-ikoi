require("./user_img.scss")

module.exports = class {
	constructor(user, isClicable = false ) {
		let $img = ""
		if ( ! user.img ) {
			$img = $(`<div class="user_img"><i class="material-icons">&#xE7FD;</i></div>`)
		} else {
			$img = $(`<div class="user_img member" style="background-image:url(${user.img})"></div>`)
			if (isClicable) {
				$img.css("cursor", "pointer")
				$img.on("click", (e) => {
					new (require("../user_profile_popup/user_profile_popup"))(user)
				})
			}
		}
		this.$html = $img
	}
}
