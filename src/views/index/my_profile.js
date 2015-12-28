require("./my_profile.scss")
module.exports = {
	$html: $(`
		<div class="pad5-side">
		
			<div class="shadow radius2 my-profile">
				
				<div class="cover">
					<div class="under-shadow">
						<div class="img"></div>
						<h2 class="nickname"></h2>
					</div>
				</div>
				
				<div class="mdl-card__supporting-text message">
					ひとことメッセージ：<span></span>
				</div>
				
				<div class="edit-profile-area mdl-card__actions mdl-card--border">
					<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
						<span class="edit-profile">
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
	`),
	load: function(callback) {
		let self = this
		$.ajax({
			url: "/api/me",
			dataType: "json",
			success: function(me) {
				global.Me = me;
				console.log( "Me", Me );
				callback(me)
			}
		})
	},
	setNickname: function() {
		this.$html.find(".nickname").text( global.Me.nickname )
	},
	setImg: function() {
		let img = global.Me.img
		if ( ! img ) {
			img = `<i class="material-icons">&#xE7FD;</i>`
		}
		this.$html.find(".img").html( img )
	},
	setEditProfileArea: function() {
		if ( ! global.Me.email ) {
			this.$html.find(".edit-profile-area").hide()
		}
	},
	setMessage: function() {
		if ( ! global.Me.email ) {
			this.$html.find(".message span").text("匿名ログイン中です...")
		}
	},
	getContent: function(callback) {
		this.load(()=>{
			this.setNickname()
			this.setImg()
			this.setEditProfileArea()
			this.setMessage()
			callback(this.$html)
		})
	}
}
