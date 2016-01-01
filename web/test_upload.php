<?php
if ( $_FILES ) {
	
	function image_upload($filename){
		global $upfileName;
	  require __DIR__ . "/../src/vendors/class.upload.php";
		
	  $handle = new Upload($_FILES['image']);
	  $upload_dir = "test_uploads";

	  if(!$handle->uploaded)
	    return $handle->error;

	  //通常の大きさの画像
	  $handle->file_overwrite     = false;      //ファイル上書き有効
	  $handle->file_auto_rename   = true;     //ファイル名自動リネーム無効
	  $handle->file_src_name_body = $filename; //ファイル名指定
	  $handle->image_resize       = true;
	  $handle->image_ratio_y      = true;
	  $handle->image_x            = 640;
	  $handle->Process($upload_dir);           //画像アップロード実行

	  //サムネイル画像
	  $handle->file_overwrite     = false;
	  $handle->file_auto_rename   = true;
	  $handle->file_src_name_body = $filename . "_thumb";
	  $handle->image_resize       = true;
	  $handle->image_ratio_y      = true;
	  $handle->image_x            = 240;
	  $handle->Process($upload_dir);
	  $upfileName = $handle->file_dst_name;


	  if (!$handle->processed)
	    return $handle->error;
	}
	
	image_upload($_FILES['image']['name']);
	echo json_encode( ["upload_file"=>$upfileName] );
	exit();
}
?>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">

<!-- JQuery -->
<script src="/bower_components/jquery/dist/jquery.min.js"></script>
<script src="/bower_components/jquery-ui/jquery-ui.min.js"></script>
<script src="/bower_components/jquery-color/jquery.color.js"></script>
<!-- MDL -->
<link rel="stylesheet" href="/bower_components/material-design-lite/material.min.css">
<script src="/bower_components/material-design-lite/material.min.js"></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<!-- webpack -->
<script src="/dist/init.js"></script>
<link rel="stylesheet" href="/dist/common.css">
<script src="/dist/common.js"></script>
<!-- Blur -->
<script src="/bower_components/Blur.js/dist/jquery.blur.js"></script>

<div class="pad5">
	<div class="panel">
		<form>
			<h2>画像アップロードクラスのテスト</h2>
			<input type="file" name="image" class="">
		</form>
	</div>
</div>
<script>
$("input[name=image]").on("change", function() {
	$form.trigger("submit");
});

var $form = $("form");
$form.on("submit", function(e) {
	e.preventDefault();
	
	var formData = new FormData($form[0]);
	$.ajax({
		url: "/test_upload.php",
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
				var per = ( data.loaded / data.total ) * 100
				console.log( per + "%" )
				$("#image-upload-progress .per-bar").width( per + "%" );
			}
			return myXhr;
		},
		success: function(data) {
			if (data.error) return alert(data.error);
			console.log( "SUCCESS", data );
			// 投稿したデータがかえってくる
			
		},
		error: function() {
			console.log("ERROR", arguments);
			alert("ERROR.  管理者に連絡してください...");
		},
	});
})
</script>
