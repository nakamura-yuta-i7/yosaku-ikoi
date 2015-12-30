<?php

$model = new Messages();

$conditions = [
	"user_id" => "10",
	"talk_id" => 1
];
$result = $model->findAll(compact("conditions"));

echo "<pre>"; var_export($result); echo "</pre>";

return;

error_log("test");

echo "<pre>"; var_export(gd_info()); echo "</pre>";

phpinfo(); 
?>
