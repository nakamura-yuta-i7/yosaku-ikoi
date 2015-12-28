module.exports = new class Home {
	constructor() {
		this.$content = $(`
			<div class="page-content">
				<h2>マイページ</h2>
				<section class="my-profile-section"></section>
				<section class="news-section"></section>
			</div>
		`)
	}
	getContent(callback) {
		let News = require("./news")
		News.getContent(($content) => {
			this.$content.find(".news-section").append($content)
			
			let MyProfile = require("./my_profile")
			MyProfile.getContent(($content)=>{
				this.$content.find(".my-profile-section").append($content)
				
				callback( this.$content )
			})
		})
	}
}
