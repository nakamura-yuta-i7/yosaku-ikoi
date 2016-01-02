<?php if ( isIE() ) : ?>
	<div class="ie-not-supported-message">
		
		<h2>Sorry</h2>
		このサイトは InternetExplorer ですべての機能を正常動作させることが困難です。<br>
		以下のブラウザを推奨しています。お手数おかけしますがインストールしてご閲覧ください。<br>
		<ul>
			<li><a href="https://www.google.co.jp/chrome/browser/" target="_blank">Google Chrome</a></li>
			<li><a href="https://www.mozilla.org/ja/firefox" target="_blank">Firefox</a></li>
		</ul>
	</div>
	<?php exit(); ?>
<?php endif; ?>

<?php include dirname(__FILE__) . "/../common/header.php"; ?>
<link rel="stylesheet" href="/dist/login.css">
<script src="/dist/login.js"></script>

<?php include dirname(__FILE__) . "/../common/footer.php"; ?>
