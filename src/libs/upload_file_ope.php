<?php
class UploadFileOpe {
	const UP_DIR = "uploads/";
	function __construct($_file) {
		# $_FILES["image"]
		# sample: 
		# [
		# error: 0
		# name: "年賀状2016.png"
		# size: 9901802
		# tmp_name: "/tmp/php6atcJ9"
		# type: "image/png"
		# ]
		$this->file = $_file;
	}
	public $folder_path = "";
	function start() {
		$this->checkSize();
		$this->prepareFolder();
		$this->moveUploadDir();
	}
	public $uploaded_path = "";
	function getUploadedPath() { return $this->uploaded_path; }
	function checkSize() {
		if ( $this->file["size"] > UPLOAD_MAX_BYTE ) {
			throw new ErrorException("アップロード可能サイズ(". formatBytes(UPLOAD_MAX_BYTE) .")を超えています。");
		}
	}
	function prepareFolder() {
		$year = date_create()->format("Y");
		$month = date_create()->format("m");
		$day = date_create()->format("d");
		$folder_path = APP_DIR . "web/" . static::UP_DIR . "{$year}/{$month}/{$day}";
		$this->folder_path = $folder_path;
		if ( ! file_exists($folder_path) ) {
			$is_success = mkdir($folder_path, 0777, $recursive=true);
			if ( ! $is_success ) {
				throw new ErrorException("フォルダ({$folder_path})の作成に失敗しました。");
			}
		}
	}
	function moveUploadDir() {
		$tmp_path = $this->file["tmp_name"];
		# メモ: move_uploaded_file()
		# このファイルからの相対パスで移動先ファイルパスを指定しないとダメみたい
		# このアプリの場合、WEBエントリポイントが./web/index.phpなので、
		# そのファイルからの相対パスである./uploads/(filename)で指定する
		$moved_path = $this->folder_path . "/" . $this->file["name"];
		$this->uploaded_path = $moved_path;
		$is_success = move_uploaded_file($tmp_path, $moved_path);
		if ( ! $is_success ) {
			throw new ErrorException("アップロードに失敗しました。");
		}
	}
}
