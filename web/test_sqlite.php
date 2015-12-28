<?php
require_once "../src/bootstrap.php";



$model = new Users();
$model->update([
	"password" => md5("yuta0502"),
], ["id"=>2] );

$result = $model->findAll();
echo "<pre>"; var_export($result); echo "</pre>";


return false;

$model = new News();

// $model->insert([
// 	"message" => "テストユーザーがログインしました。",
// 	"created" => date_create()->format("Y-m-d H:i:s"),
// 	"modified" => date_create()->format("Y-m-d H:i:s"),
// ]);

// $model->update([
// 	"modified" => "2015-12-27 19:53",
// ], [] );

// $model->delete([]);

// $result = $model->findById(2);
// echo "<pre>findById():<br>"; var_export($result); echo "</pre>";

$result = $model->findOne([
	"message" => "LIKE '%テスト%'",
]);
echo "<pre>findOne():<br>"; var_export($result); echo "</pre>";

// $result = $model->query("select * from news WHERE message IS NULL")->fetchAll();
// 
// echo "<pre>"; var_export($result); echo "</pre>";
?>
<hr>
test
