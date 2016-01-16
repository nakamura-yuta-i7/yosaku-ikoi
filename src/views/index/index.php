<?php include dirname(__FILE__) . "/../common/header.php"; ?>
<script>
void function(global) {
	global.Me = <?php echo json_encode(AppUser::getUser(), JSON_UNESCAPED_UNICODE); ?>;
}(window)
</script>
<link rel="stylesheet" href="/dist/index.css?20160117">
<script src="/dist/index.js?20160117"></script>

<?php include dirname(__FILE__) . "/../common/footer.php"; ?>
