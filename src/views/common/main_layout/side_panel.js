require("./side_panel.scss")
module.exports = {
	html: `
		<div class="btn-side-panel-open">
			<i class="material-icons">&#xE5D2;</i>
		</div>
		
		<div class="side-panel-overlay"></div>
		
		<div class="side-panel">
			
			<div class="menu-cover">
				<img class="yosaku-logo" width="90" src="${require("../../login/logo_ikoi.png")}">
			</div>
			
			<div class="title">
				Menu
			</div>
			<nav>
				<a href="javascript:void(0);" class="disabled">
					<i class="material-icons">&#xE8A7;</i>
					<span>マイメディア</span>
				</a>
				<a href="http://yosaku.info/" target="_blank" class="">
					<i class="material-icons">&#xE91B;</i>
					<span>良作HP</span>
					<i class="material-icons" style="font-size:15px;">&#xE89E;</i>
				</a>
				<a href="/logout" class="">
					<i class="material-icons">&#xE879;</i>
					<span>ログアウト</span>
				</a>
			</nav>
		</div>
	`,
	setEvent: function() {
		// サイドパネル閉じる
		$(document).on("click", ".side-panel-overlay", function() {
			$(".side-panel-overlay").hide()
			$(".side-panel").hide()
		})
		// サイドパネル表示
		$(document).on("click", ".btn-side-panel-open", function() {
			$(".side-panel-overlay").show()
			$(".side-panel").css({left:-250}).animate({left:0}, 200).show()
		})
	}
}
