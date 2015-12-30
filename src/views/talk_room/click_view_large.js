require("./click_view_large.scss")

module.exports = class {
	constructor(img_path) {
		this.$html = $(`
			<div class="popup-image">
				<div class="comment">
					クリックで閉じる
				</div>
				<img src="${img_path}">
			</div>
		`)
	}
	render() {
		$("body").append( this.$html )
	}
	close() {
		this.$html.remove()
	}
}
