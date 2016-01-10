<?php
require_once __DIR__ . "/../src/bootstrap.php";

$_SESSION["yuta"] = [];
$_SESSION["yuta"]["nakamura"] = [];
$_SESSION["yuta"]["nakamura"]["31歳"] = "赤羽西";

$users = new Users();
$user = $users->findById(13);

// AppUser::setUser($user);

echo "<pre>"; var_export($user); echo "</pre>";

echo "<pre>"; var_export($_SESSION); echo "</pre>";
