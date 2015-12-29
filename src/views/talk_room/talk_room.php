<?php include dirname(__FILE__) . "/../common/header.php"; ?>
<script>
void function(global) {
	global.talk_title = "<?php echo $title; ?>";
	global.talk_id = "<?php echo $id; ?>";
	global.Me = <?php echo json_encode(AppUser::getUser(), JSON_UNESCAPED_UNICODE); ?>;
}(window)
</script>

<link rel="stylesheet" href="/dist/talk_room.css">
<script src="/dist/talk_room.js"></script>

<?php include dirname(__FILE__) . "/../common/footer.php"; ?>
