module.exports = class Dialog {
	constructor() {
	}
	render($content) {
		this.renderOverlay()
		this.renderDialog($content)
	}
	renderOverlay() {
		let self = this
		let $overlay = $(`
			<div class="modal-overlay">
				<style>
				.modal-overlay {
					position: fixed;
					top: 0; left: 0;
					z-index: 998;
					width: 100%;
					height: 100%;
					background: #000;
					opacity: 0.3;
				}
				</style>
			</div>
		`).on("click", function() {
			$(this).remove()
			self.$dialog.remove()
			$(".container").removeClass("blur")
		})
		$("body").append( $overlay )
		$(".container").addClass("blur")
	}
	renderDialog($content) {
		this.$dialog = $(`
			<div class="dialog radius3">
				<style>
				.dialog {
					text-align: center;
					background: #fff;
					padding: 20px;
					box-sizing: border-box;
					position: fixed;
					z-index: 999;
					left: 50%; top: 50%;
					min-width: 280px;
					margin-left: -150px;
				}
				</style>
				<div class="inner">
					<div class="content"></div>
				</div>
			</div>
		`)
		this.$dialog.find(".content").append( $content )
		$("body").append( this.$dialog )
		// 高さを画面高さ中央にくるように調整
		let height = this.$dialog.height()
		this.$dialog.css("margin-top", "-"+height )
	}
}
