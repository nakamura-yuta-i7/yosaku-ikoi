require("./footer_chat_panel.scss")
module.exports = {
	html: `
		<form class="footer_chat_panel">
			<div class="tr">
				<div>
					<span class="btn btn-add mdl-js-button" href="#" id="demo-menu-top-left">
						<i class="material-icons">&#xE145;</i>
					</span>
					<!-- メディア追加メニュー -->
					<ul class="mdl-menu mdl-menu--top-left mdl-js-menu mdl-js-ripple-effect"
					    for="demo-menu-top-left">
					  <li class="mdl-menu__item">
							<i class="material-icons">&#xE3B6;</i>
							<span>画像を追加</span>
						</li>
						<li disabled class="mdl-menu__item">
							<i class="material-icons">&#xE3B6;</i>
							<span>画像を加工してから追加</span>
						</li>
					  <li disabled class="mdl-menu__item">
							<i class="material-icons">&#xE064;</i>
							<span>動画を追加</span>
						</li>
						<li disabled class="mdl-menu__item">
							<i class="material-icons">&#xE55F;</i>
							<span>位置情報を追加</span>
						</li>
					</ul>
				</div>
				<div>
					<span class="btn btn-emotion" href="#" id="open-emotion-menu">
						<i class="material-icons">&#xE24E;</i>
					</span>
					<!-- 絵文字メニューパネル -->
					<div class="mdl-menu mdl-menu--top-left mdl-js-menu mdl-js-ripple-effect"
					    for="open-emotion-menu">
							<div class="" style="padding:10px; white-space:nowrap;">
								Comming Soon...
							</div>
					</div>
					
				</div>
				<div class="chat-input-area">
					<textarea name="message" class="chat-input" rows="1"></textarea>
				</div>
				<div>
					<button type="submit" class="chat-submit mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
						送信
					</button>
				</div>
			</div>
		</form>
	`,
	setEventListener: function() {
		$("form.footer_chat_panel").on("submit", function(e) {
			e.preventDefault()
			console.log( $(this).serialize() );
		})
		// メッセージ入力エリアはEnterで可変
		$(".chat-input").on("keypress", function(e) {
			let keynum = 0;
			// IE
			if(window.event) {
				keynum = e.keyCode;
			// Netscape/Firefox/Opera
			} else if(e.which) {
				keynum = e.which;
			}

			if( keynum == 13 ) { // Enter
				console.log( $(this) );
				if( 3 <= $(this).attr("rows") ) {
					return;
				}else{
					$(this).attr("rows", Number($(this).attr("rows")) + 1 )
				}
			}
		})
	}
}
