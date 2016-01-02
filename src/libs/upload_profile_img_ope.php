<?php
class UploadProfileImgOpe {
	
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
	function start() {
		$this->getHandle();
		$this->checkFileType();
		$this->checkSize();
		$this->prepareFolder();
		$this->moveUploadDir();
	}
	function getHandle() {
		require_once dirname(__FILE__) . "/../vendors/class.upload.php";
		$this->handle = new Upload($this->file);
		if ( ! $this->handle->uploaded ) {
			return $this->handle->error;
		}
	}
	
	function getSrcFileName() { return $this->file["name"]; }
	function checkFileType() {
		
	}
	function checkSize() {
		if ( $this->file["size"] > UPLOAD_MAX_BYTE ) {
			throw new ErrorException("アップロード可能サイズ(". formatBytes(UPLOAD_MAX_BYTE) .")を超えています。");
		}
	}
	
	public $up_dir = "";
	public $folder_path_absolute = "";
	public $folder_path_relative = "";
	function prepareFolder() {
		if ( ! $this->up_dir ) {
			throw new ErrorException("アップロード先の指定は必須です。 memo: 相対パス");
		}
		$this->folder_path_relative = $this->up_dir;
		$folder_path = APP_DIR . "web/" . $this->folder_path_relative;
		$this->folder_path_absolute = $folder_path;
		$this->mkdir($folder_path);
	}
	function mkdir($folder_path) {
		if ( ! file_exists($folder_path) ) {
			$is_success = mkdir($folder_path, 0777, $recursive=true);
			if ( ! $is_success ) {
				throw new ErrorException("フォルダ({$folder_path})の作成に失敗しました。");
			}
		}
	}
	
	public $uploaded_path = "";
	function getImgPath()   { return $this->uploaded_path; }
	
	function moveUploadDir() {
		
		$upload_dir = $this->folder_path_relative;
		$filename = pathinfo($this->file["name"])["filename"];
		
		# 通常の大きさの画像
		$this->handle->file_overwrite     = false;      //ファイル上書き有効
		$this->handle->file_auto_rename   = true;       //ファイル名自動リネーム無効
		$this->handle->file_src_name_body = $filename;  //ファイル名指定
		$this->handle->image_resize       = true;
		$this->handle->image_ratio_y      = true;
		$this->handle->image_x            = 240;
		$this->handle->Process($upload_dir);            //画像アップロード実行
		
		$this->uploaded_path = $upload_dir . "/" . $this->handle->file_dst_name;
		
		if ( ! $this->handle->processed ) {
			throw new ErrorException($this->handle->error);
		}
		
		error_log($this->handle->log);
	}
}
