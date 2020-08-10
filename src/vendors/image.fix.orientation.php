<?php
# 画像にEXIF情報が付与されていたら自動的に回転を行う
# 使い方サンプル：
# 以下でアップロード直後のバイナリデータが参照できるので、
# $_FILES['image']['tmp_name']
# この関数に対して引数を渡して上げるだけで回転する
# image_fix_orientation($_FILES['image']['tmp_name']);
function image_fix_orientation($filename) {
	$exif = exif_read_data($filename);
	if ( !empty($exif['Orientation']) ) {
		$image = imagecreatefromjpeg($filename);
		switch ($exif['Orientation']) {
			case 3:
					$image = imagerotate($image, 180, 0);
					break;
			case 6:
					$image = imagerotate($image, -90, 0);
					break;
			case 8:
					$image = imagerotate($image, 90, 0);
					break;
		}
		imagejpeg($image, $filename, 90);
	}
}
