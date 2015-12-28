<?php

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

function sendMail($params) {
	
	if (
		! array_key_exists("from", $params) ||
		! array_key_exists("to", $params) ||
		! array_key_exists("subject", $params) ||
		! array_key_exists("body", $params)
	) {
		throw new ErrorException("必須項目に漏れがあります。");
	}
	
	extract($params);
	
	if ( ! IS_STAGING ) throw new ErrorException("本番環境のメール実装が必要です。");
	// ───────────────────────────────────
	// 本番環境のメール送信ロジック
	// ───────────────────────────────────
	
	
	
	// ───────────────────────────────────
	// 以下は、本番環境以外でのメール送信ロジック
	// ───────────────────────────────────
	
	require_once dirname(__FILE__) . '/../vendors/PHPMailer/PHPMailerAutoload.php';
	require_once dirname(__FILE__) . '/../passwords.php';
	$mail = new PHPMailer;
	$mail->setLanguage('ja');

	//$mail->SMTPDebug = 3;                               // Enable verbose debug output

	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = "smtp.mail.yahoo.co.jp";
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = "yuta_nakamura_i7";
	$mail->Password = SMTP_PASSWORD;
	$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 465;                                    // TCP port to connect to

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
	
	$mail->isHTML(true);                                  // Set email format to HTML
	
	$mail->Subject = mb_encode_mimeheader($subject);
	$mail->Body    = $body;
	// $mail->AltBody = 'ALTBODYってなんだ？？';

	if( ! $mail->send() ) {
		throw new ErrorException($mail->ErrorInfo);
	} else {
		// TODO: Logger add
	}
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
