<?php
$folder = "../data/";
if(!file_exists($folder)) mkdir($folder);
//Code list
$codeFile = "../data/codes.json";



function getUniqueID(){
  if(isset($_POST['group']) && $_POST['group']) $prefix = $_POST['group'];
  else $prefix = 'NA';
  if(isset($_POST['level']) && $_POST['level']) $prefix .= $_POST['level'];
  else $prefix .= 'NA';

  $codeJSON = json_decode(file_get_contents("../data/codes.json"));
  $index = 0;
  do {
    $index++;
  } while(array_search($prefix.''.str_pad($index, 2, '0', STR_PAD_LEFT), $codeJSON->codes) !== FALSE);
  return $prefix.''.str_pad($index, 2, '0', STR_PAD_LEFT);
}





//Saving temp files during the task.
if(isset($_POST['mode']) && $_POST['mode'] == 'tmp'){
  $folder.='tmp/';
  if(!file_exists($folder)) mkdir($folder);
  $filename = $_POST['uuid'];
  $ID = getUniqueID();
}else{ //Task complete ...
  if(isset($_POST['filename']) && !empty($_POST['filename'])){
    //put in the noform folder
    $folder .= 'noform/';
    if(!file_exists($folder)) mkdir($folder);

    $ID = $filename = $_POST['filename'];
    //$ID = getUniqueID();
  }else{
    $folder .= 'withform/';
    if(!file_exists($folder)) mkdir($folder);
  }

  //assign filename when there is no code previously assigned
  if(!isset($filename)){
    $filename = $ID = getUniqueID();
  }
}




if($filename == $ID){
  $codeJSON = json_decode(file_get_contents($codeFile));
  $codeJSON->codes[] = $ID;
  sort($codeJSON->codes);
  file_put_contents($codeFile, json_encode($codeJSON, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

//get data
$csvData = $_POST['data'];

if(file_exists("{$folder}{$filename}.csv") && !isset($_POST['overwrite'])){
  $index = 0;
  do {
    $index++;
  } while(file_exists("{$folder}~{$filename}".'_'.str_pad($index, 2, '0', STR_PAD_LEFT) . '.csv'));
  $filename = "~{$filename}".'_'.str_pad($index++, 2, '0', STR_PAD_LEFT);
}

file_put_contents("{$folder}{$filename}.csv", $csvData);

echo json_encode(array('id'=>$ID, 'filename'=>"{$folder}{$filename}.csv"));
