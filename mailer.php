<?php
//google recaptcha//
if ($_POST['recaptcha']){
	//$recaptcha_secret = "6LfnmicTAAAAAOMtv7pxE_mMDzIdESdyoCrhbLVU";
	$recaptcha_secret = "6LcLlVwUAAAAAIOWrthz_iDn2e4VHbL9r9Nv1227";
	$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$recaptcha_secret."&response=".$_POST['recaptcha']);
	$response = json_decode($response, true);
}else{
	echo 'recaptcha';
	exit;
}
if($response["success"] === false){
	echo 'recaptcha';
	exit;
}


	//print_r($_POST);
	$apply = $_POST['apply'];
  $name = $_POST['name'];  
	$email_address = $_POST['email'];	
	$phone = $_POST['phone'];	
	$zipcode = $_POST['zipcode'];	
  $email_body = "You have received a new message. <br /><br />". "Here are the details:<br /><br /><b>Name:</b> $name <br />"."<b>Email:</b> $email_address";	
	if($phone)	$email_body .= "<br /><b>Phone:</b> $phone";	
	if($zipcode)	$email_body .= "<br /><b>Zipcode:</b> $zipcode";	
 // create email body and send it  
 $to = 'aig.chinese@gmail.com'; 
	require("./PHPMailer_5.2.4/class.phpmailer.php");

	$mail = new PHPMailer();

	$mail->IsSMTP();  // telling the class to use SMTP
	$mail->SMTPAuth   = true; // SMTP authentication
	$mail->SMTPSecure = "tls";
	$mail->Host       = "smtp.gmail.com"; // SMTP server
	$mail->Port       = 587; // SMTP Port
	$mail->Username   = "aig.chinese@gmail.com"; // SMTP account username
	$mail->Password   = "Aigcmpg2620";        // SMTP account password

	$mail->SetFrom($email_address, $name); // FROM
	$mail->AddReplyTo($email_address, $name); // Reply TO
	
	$mail->AddAddress($to, ''); // recipient email
	if($apply)
	$mail->Subject    = "New Submission from AIG Apply Now"; // email subject
	else
	$mail->Subject    = "New Submission from AIG Contact Form"; // email subject
	$mail->Body       = $email_body;
	$mail->isHTML(true);
	//$mail->SMTPDebug = 6;
	if(!$mail->Send()) {
		echo 'Message was not sent.';
		echo 'Mailer error: ' . $mail->ErrorInfo;
	} else {
		echo 'Message has been sent.';
	} 
 
?>