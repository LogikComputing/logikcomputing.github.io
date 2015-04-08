<?php
include_once "data.php";

if($_POST && isset($_POST['contact'], $_POST['name'], $_POST['email'], $_POST['subject'], $_POST['message'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $headers = "From: ".$name."<".$email.">\r\n";
    mail("philip@haplit.com", $subject, $message, $headers);
	//sendMail($email, $name, $subject, $message);
	header("Location: index.html");
	exit;
} else if($_POST && isset($_POST['email_list'], $_POST['email'], $_POST['comments'])) {
	$email = cleanInput($_POST['email']);
	$comments = cleanInput($_POST['comments']);
	insertContact($email, $comments);
	header("Location: index.html");
	exit;
}

?>