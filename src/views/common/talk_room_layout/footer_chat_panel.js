require("./footer_chat_panel.scss")

module.exports = {
	html: `
		<form class="footer_chat_panel">
			<input type="hidden" name="talk_id" value="${global.talk_id}">
			<div class="tr">
				<div>
					<span class="btn btn-add mdl-js-button" href="#" id="demo-menu-top-left">
						<i class="material-icons">&#xE145;</i>
					</span>
					<!-- メディア追加メニュー -->
					<ul class="mdl-menu mdl-menu--top-left mdl-js-menu mdl-js-ripple-effect"
							for="demo-menu-top-left">
						<li id="upload-image" class="mdl-menu__item">
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
			
			<div id="image-upload-progress">
				<div class="per-bar"></div>
			</div>
			
		</form>
	`,
	setEventListener: function() {
		
		// ==========================
		// チャットメッセージ送信
		// ==========================
		$("form.footer_chat_panel").on("submit", function(e) {
			e.preventDefault()
			$.ajax({
				url: "/api/messages/add",
				data: $(this).serialize(),
				method: "post",
				dataType: "json",
				success: function(data) {
					if (data.error) return alert(data.error)
					// 投稿したデータがかえってくる
					let $message = new (require("../../talk_room/talk_room_message"))(data).getContent()
					TalkRoom.layout.addContent( $message )
					$(".chat-input").val("")
				}
			})
		})
		
		// ==========================
		// 画像アップロード
		// ==========================
		$("#upload-image").on("click", function(e) {
			let form_id = "upload-image-form"
			$("#"+form_id).remove()
			let $form = $(`
				<form id="${form_id}" class="hidden">
					<input type="hidden" name="talk_id" value="${global.talk_id}">
					<input type="file" name="image">
				</form>
			`)
			$("body").append($form)
			$form.on("submit", function(e) {
				e.preventDefault()
				$("#image-upload-progress").show()
				
				var formData = new FormData($form[0]);
				$.ajax({
					url: "/api/messages/image/add",
					method: "post",
					dataType: "json",
					data: formData,
					contentType: false,
					processData: false,
					xhr: function() {
						var myXhr = $.ajaxSettings.xhr();
						if( myXhr.upload ){
								myXhr.upload.addEventListener(
									'progress',
									progressHandlingFunction, false);
						}
						function progressHandlingFunction(data) {
							let per = ( data.loaded / data.total ) * 100
							console.log( per + "%" )
							$("#image-upload-progress .per-bar").width( per + "%" )
							if ( per == 100 ) {
								setTimeout(function() {
									$("#image-upload-progress").fadeOut()
								}, 500)
							}
						}
						return myXhr;
					},
					success: function(data) {
						if (data.error) return alert(data.error)
						console.log( "SUCCESS", data )
						// 投稿したデータがかえってくる
						let $message = new (require("../../talk_room/talk_room_message"))(data).getContent()
						TalkRoom.layout.addContent( $message )
						
						console.log( $message )
						
						setTimeout(function() {
							$("#image-upload-progress").fadeOut()
						}, 500)
					},
					error: function() {
						console.log("ERROR", arguments);
						alert("ERROR.  管理者に連絡してください...")
						
						setTimeout(function() {
							$("#image-upload-progress").fadeOut()
						}, 500)
					},
				})
				$form.remove()
			})
			$form.find("[name=image]").on("change", function() {
				console.log( "KOKO!" );
				$form.trigger("submit")
			})
			$form.find("[name=image]").trigger("click")
		})
		
		
		// ==========================
		// メッセージ入力エリアはEnterで可変
		// ==========================
		$(".chat-input").on("keypress, keydown", function(e) {
			let keynum = 0;
			// IE
			if(window.event) {
				keynum = e.keyCode;
			// Netscape/Firefox/Opera
			} else if (e.which) {
				keynum = e.which;
			} else {
				console.log( "!?" );
			}
			
			let row_count = Number( $(this).attr("rows") )
			let text_br_count = $(this).val().split("\n").length
			// console.log( "テキストの行数", text_br_count );
			// console.log( "row_count", row_count );
			
			if( keynum == 13 ) { // Enter
				// console.log( "Enter" );
				if( 3 >= text_br_count ) {
					$(this).attr("rows", Number(row_count) + 1 )
				}
			}
			if( keynum == 8 || keynum == 46 ) { // Backspace or Delete
				// console.log( "Del or Bks" );
				if( text_br_count < row_count ) {
					$(this).attr("rows", Number(row_count) - 1 )
				}
			}
		})
	}
}
