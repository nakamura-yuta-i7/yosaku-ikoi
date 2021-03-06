<?php

function isIE() {
	$user_agent = $_SERVER['HTTP_USER_AGENT'];
	return strstr($user_agent, 'Trident') || strstr($user_agent, 'MSIE');
}

function decamelize($word) {
	return preg_replace(
		'/(^|[a-z])([A-Z])/e', 
		'strtolower(strlen("\\1") ? "\\1_\\2" : "\\2")',
		$word 
	); 
}

function camelize($word) { 
	return preg_replace('/(^|_)([a-z])/e', 'strtoupper("\\2")', $word); 
}

function formatBytes($size, $precision = 2) {
	$base = log($size, 1024);
	$suffixes = array('', 'k', 'M', 'G', 'T');
	return round(pow(1024, $base - floor($base)), $precision) . $suffixes[floor($base)];
}


function sendMail($params) {
	
	if ( IS_STAGING ) {
		# 検証環境ではログに記載する
		error_log(var_export($params, true));
		return false;
	}
	
	if (
		! array_key_exists("from", $params) ||
		! array_key_exists("to", $params) ||
		! array_key_exists("subject", $params) ||
		! array_key_exists("body", $params)
	) {
		throw new ErrorException("必須項目に漏れがあります。");
	}
	
	extract($params);
	
	require_once dirname(__FILE__) . '/../vendors/PHPMailer/PHPMailerAutoload.php';
	require_once dirname(__FILE__) . '/../passwords.php';
	$mail = new PHPMailer;
	$mail->setLanguage('ja');
	$mail->Encoding = "7bit";
	$mail->CharSet = 'ISO-2022-JP';

	//$mail->SMTPDebug = 3;                               // Enable verbose debug output
	
	if ( IS_STAGING ) {
		$mail->isSMTP();                                      // Set mailer to use SMTP
		$mail->Host = "smtp.mail.yahoo.co.jp";
		$mail->SMTPAuth = true;                               // Enable SMTP authentication
		$mail->Username = "yuta_nakamura_i7";
		$mail->Password = SMTP_PASSWORD;
		$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
		$mail->Port = 465;                                    // TCP port to connect to
	}

	$mail->setFrom($from);
	// $mail->addAddress('joe@example.net', 'Joe User');
	$mail->addAddress($to);
	if ( isset($replay_to) ) {
		$mail->addReplyTo($replay_to);
	} else {
		$mail->addReplyTo($from);
	}
	// $mail->addCC('cc@example.com');
	if ( isset($bcc) ) {
		$mail->addBCC($bcc);
	}
	// $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
	// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
	
	// $mail->isHTML(true);                                  // Set email format to HTML
	
	$mail->Subject = mb_encode_mimeheader($subject);
	$mail->Body    = mb_convert_encoding($body, "JIS", "UTF-8");
	// $mail->AltBody = 'ALTBODYってなんだ？？';

	if( ! $mail->send() ) {
		throw new ErrorException($mail->ErrorInfo);
	} else {
		// TODO: Logger add
	}
}

function url_henkan($mojiretu){
	// $mojiretu = htmlspecialchars($mojiretu,ENT_QUOTES);
	// $mojiretu = nl2br($mojiretu);
	//文字列にURLが混じっている場合のみ下のスクリプト発動
		if(preg_match("/(http|https):\/\/[-\w\.]+(:\d+)?(\/[^\s]*)?/",$mojiretu)){
			preg_match_all("/(http|https):\/\/[-\w\.]+(:\d+)?(\/[^\s]*)?/",$mojiretu,$pattarn);
				foreach ($pattarn[0] as $key=>$val){
					$replace[] = '<a class="converted-url" href="'.$val.'" target="_blank">'.$val.'</a>';
				}
		$mojiretu = str_replace($pattarn[0],$replace,$mojiretu);
		}
	return $mojiretu;
}

// function sendMail($to, $subject, $body, $from_email,$from_name) {
// 	$headers  = "MIME-Version: 1.0 \n" ;
// 	$headers .= "From: " .
// 	       "".mb_encode_mimeheader (mb_convert_encoding($from_name,"ISO-2022-JP","AUTO")) ."" .
// 	       "<".$from_email."> \n";
// 	$headers .= "Reply-To: " .
// 	       "".mb_encode_mimeheader (mb_convert_encoding($from_name,"ISO-2022-JP","AUTO")) ."" .
// 	       "<".$from_email."> \n";
// 				 
// 	$headers .= "Content-Type: text/plain;charset=ISO-2022-JP \n";
// 	
// 	/* Convert body to same encoding as stated 
// 	in Content-Type header above */
// 	
// 	$body = mb_convert_encoding($body, "ISO-2022-JP","AUTO");
// 	
// 	/* Mail, optional paramiters. */
// 	$sendmail_params  = "-f$from_email";
// 	
// 	mb_language("ja");
// 	$subject = mb_convert_encoding($subject, "ISO-2022-JP","AUTO");
// 	$subject = mb_encode_mimeheader($subject);
// 
// 	$result = mail($to, $subject, $body, $headers, $sendmail_params);
// 	
// 	return $result;
// }
