require("./my_profile.scss")
module.exports = new class {
	
	constructor() {
		let background_url = `/imgs/my_profile/default_cover.jpg`
		if ( global.Me.img_background ) {
			background_url = global.Me.img_background
		}
		
		let img = new (require("../common/parts/user_img/user_img"))(global.Me).$html.getHTML()
		
		this.$html = $(`
			<div class="pad5-side">
			
				<div class="shadow radius2 my-profile">
					
					<div class="cover" style="background-image: url(${background_url});">
						<div class="under-shadow">
							${img}
							<h2 class="nickname"></h2>
						</div>
					</div>
					
					<div class="mdl-card__supporting-text message">
						ひとことメッセージ：<span></span>
					</div>
					
					<div class="edit-profile-area mdl-card__actions mdl-card--border">
						<a class="edit-profile mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
							<span>
								プロフィールを編集
							</span>
						</a>
					</div>
					
					<!-- 
					<div class="mdl-card__menu map">
						<a href="">
							<i class="material-icons" title="地図を表示">&#xE55B;</i>
							<span>
								地図を表示
							</span>
						</a>
					</div>
					-->
				</div>
				
			</div>
		`)
	}
	setNickname() {
		this.$html.find(".nickname").text( global.Me.nickname )
	}
	setEditProfileArea() {
		if ( ! global.Me.email ) {
			return this.$html.find(".edit-profile-area").hide()
		}
		let $edit_button = this.$html.find(".edit-profile")
		
		$edit_button.on("click", function() {
			let form = new (require("./my_profile_edit"))
			form.showForm()
		})	
	}
	setMessage() {
		if ( ! global.Me.email ) {
			this.$html.find(".message span").text("匿名ログイン中です...")
		} else {
			this.$html.find(".message span").text(global.Me.message)
		}
	}
	getContent(callback) {
		this.setNickname()
		this.setEditProfileArea()
		this.setMessage()
		callback(this.$html)
	}
}
