<?php
// PHP接收参数的方法
$data = $_GET["data"];
// PHP设置请求头
header("Access-Control-Allow-Origin:*");
// PHP设置请求方法
header("Access-Control-Allow-Method:GET");
// 定义后台跨域的url PHP用.来拼接字符串
$url =$data;
// 读取url数据
$html = file_get_contents($url);
// 给前端返回数据
echo $html;
?>