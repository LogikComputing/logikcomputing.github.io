<?php

$db_host = "localhost";
$db_admin = "logik_basic";
$db_admin_pass = "inventure"; 
$db_main = "logik_haplit";
connect($db_admin, $db_admin_pass, $db_main);

date_default_timezone_set("America/New_York"); 

function connect($db_user, $db_pass, $db_database) { 
 mysql_connect($db_host, $db_user, $db_pass) or die(mysql_error());
 mysql_select_db($db_database) or die(mysql_error());
}

function insertContact($email, $comments) {
	$result = mysql_query("INSERT INTO contacts (email, comments) VALUES ('$email', '$comments');") or die(mysql_error()); 
}

function sendMail($from, $name, $subject, $message) {
	$mail             = new PHPMailer(); // defaults to using php "mail()"
	$body             = $message;

	$mail->SetFrom('team@haplit.com', 'Contact Mailer');

	$mail->AddReplyTo($from, $name);

	$address = "philip@haplit.com";
	$mail->AddAddress($address, "Philip Bale");

	$mail->Subject    = $subject;

	$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test

	$mail->MsgHTML($body); 

	if(!$mail->Send()) {
	  echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
	  echo "Message sent!";
	}
}


function validEmail($email)
{
   $isValid = true;
   $atIndex = strrpos($email, "@");
   if (is_bool($atIndex) && !$atIndex)
   {
      $isValid = false;
   }
   else
   {
      $domain = substr($email, $atIndex+1);
      $local = substr($email, 0, $atIndex);
      $localLen = strlen($local);
      $domainLen = strlen($domain);
      if ($localLen < 1 || $localLen > 64)
      {
         // local part length exceeded
         $isValid = false;
      }
      else if ($domainLen < 1 || $domainLen > 255)
      {
         // domain part length exceeded
         $isValid = false;
      }
      else if ($local[0] == '.' || $local[$localLen-1] == '.')
      {
         // local part starts or ends with '.'
         $isValid = false;
      }
      else if (preg_match('/\\.\\./', $local))
      {
         // local part has two consecutive dots
         $isValid = false;
      }
      else if (!preg_match('/^[A-Za-z0-9\\-\\.]+$/', $domain))
      {
         // character not valid in domain part
         $isValid = false;
      }
      else if (preg_match('/\\.\\./', $domain))
      {
         // domain part has two consecutive dots
         $isValid = false;
      }
      else if (!preg_match('/^(\\\\.|[A-Za-z0-9!#%&`_=\\/$\'*+?^{}|~.-])+$/', str_replace("\\\\","",$local)))
      {
         // character not valid in local part unless 
         // local part is quoted
         if (!preg_match('/^"(\\\\"|[^"])+"$/',
             str_replace("\\\\","",$local)))
         {
            $isValid = false;
         }
      }
      if ($isValid && function_exists('checkdnsrr'))
      {
      	if (!(checkdnsrr($domain,"MX") || checkdnsrr($domain,"A"))) {
         // domain not found in DNS
         $isValid = false;
       }
      }
   }
   return $isValid;
}

function cleanInput($string) {
  $string = trim($string); // Strip whitespace from the beginning of a string.
  $string = str_replace('<?php', 'fail', $string); 
  $string = str_replace('mysql', 'fail', $string); 
   $string = str_replace('query(', 'fail', $string); 
  /*$string = strip_tags($string); // Strip HTML and PHP tags. */
  if (!get_magic_quotes_gpc()) { // Returns 0 if magic_quotes_gpc is off, 1 otherwise.
   $string = addslashes($string);
  }
  $string = rtrim($string); // Strip whitespace from the end of a string.
  return $string; // Return the final string.
 } 
 
 function convertLink($link) {
 echo getConvertedLink($link); 
}

?>