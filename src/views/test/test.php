<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
<div class="container">
	<div class="header"></div>
	<div class="content">
		テスト文字列<br>
		テスト文字列<br><br><br>
		テスト文字列<br>
		テスト文字列<br><br><br>
		テスト文字列<br>
		テスト文字列<br><br><br>
		テスト文字列<br>
		テスト文字列<br><br><br>
		テスト文字列<br>
		テスト文字列<br><br><br>
		テスト文字列<br>
		テスト文字列<br><br><br>
		テスト文字列<br>
		テスト文字列<br><br><br>
		テスト文字列<br>
		テスト文字列<br><br><br>
		テスト文字列<br>
		テスト文字列<br><br><br>
		テスト文字列<br>
		テスト文字列<br><br><br>
		テスト文字列<br>
		テスト文字列<br><br><br>
		テスト文字列<br>
		テスト文字列<br><br><br>
		テスト文字列<br>
		テスト文字列<br><br><br>
		テスト文字列<br>
		テスト文字列<br><br><br>
		テスト文字列<br>
		テスト文字列<br><br><br>
		テスト文字列<br>
		テスト文字列<br><br><br>
	</div>
	<div class="footer"></div>
</div>

<style>
body, html {
	padding:0px;
	margin:0px;
}
body {
	background: #efefef;
}
.content {
	position: fixed;
	top: 50px;
	overflow: scroll;
	-webkit-overflow-scrolling: touch;
	width:100%;
	max-width: 500px;
	background: #fff;
}
.header {
	position: fixed;
	top: 0px;
	height: 50px;
	background: #333;
	z-index: 100;
	width:100%;
	max-width: 500px;
}
.footer {
	position: fixed;
	bottom: 0px;
	height: 50px;
	background: #333;
	z-index: 100;
	width:100%;
	max-width: 500px;
}
</style>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script>
$(function() {
	var height = $("body").height() - $(".header").height() - $(".footer").height();
	$(".content").height(height);
})
</script>
