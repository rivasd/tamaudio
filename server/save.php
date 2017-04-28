<?php
$folder = "../data/";
if(!file_exists($folder)) mkdir($folder);

//assign filename
if(isset($_POST['filename']) && $_POST['filename']){
  //put in the noform folder
  $folder .= 'noform/';
  if(!file_exists($folder)) mkdir($folder);

  $filename = $_POST['filename'];
  $index = 1;
  if(file_exists($folder.$filename.'.csv')){
    do {
      $filename = $filename.'_'.str_pad($index++, 2, '0', STR_PAD_LEFT);
    } while(file_exists($folder.$filename.'.csv'));
  }
}

//assign filename when there is no code previously assigned
if(!isset($filename)){
  //put in the withform folder
  $folder .= 'withform/';
  if(!file_exists($folder)) mkdir($folder);

  if(isset($_POST['group']) && $_POST['group']) $prefix = $_POST['group'];
  else $prefix = 'UNASSIGNED';
  $index = 1;
  do {
    $filename = $prefix.'_'.str_pad($index++, 2, '0', STR_PAD_LEFT);

  } while(file_exists($folder.$filename.'.csv'));
}

//get data
$cvsData = $_POST['data'];

//write file
$fp = fopen("{$folder}{$filename}.csv", "w");
if ($fp)
{
    fwrite($fp,$cvsData); // Write information to the file
    fclose($fp); // Close the file
}
