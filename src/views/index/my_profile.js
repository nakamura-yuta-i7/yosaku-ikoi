require("./my_profile.scss")
module.exports = $(`
	<div class="pad5-side">
	
		<div class="demo-card-wide mdl-card mdl-shadow--2dp">
			<div class="mdl-card__title">
				<h2 class="mdl-card__title-text">Welcome</h2>
			</div>
			<div class="mdl-card__supporting-text">
				ひとことメッセージ：
			</div>
			<div class="mdl-card__actions mdl-card--border">
				<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
					プロフィールを編集
				</a>
			</div>
			<div class="mdl-card__menu">
				<a href="">
					<i class="material-icons" title="地図を表示">&#xE55B;</i>
					地図を表示
				</a>
			</div>
		</div>
		
	</div>
`)
