<?php
define('PASS_PHRASE', "dfakjh0!@@1@876657*&?*%&93rjioasdf");
require 'cryptojs.php';

if( isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) && ( $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest' ) )
{
    // allow access....
    if(isset($_GET["file"]) && file_exists("../data/" . $_GET["file"])){
      echo cryptoJsAesEncrypt(PASS_PHRASE, file_get_contents("../data/" . $_GET["file"]));
    }
} else {
    // ignore....
    echo 'Illegal access';
}
?>
