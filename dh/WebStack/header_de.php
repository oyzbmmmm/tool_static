<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="<?php $this->options->charset(); ?>">
  <title><?php $this->options->title(); ?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/ico" href="/favicon.ico">
  <!--link rel="stylesheet" href="//fonts.googleapis.com/css?family=Arimo:400,700,400italic"-->
  
  <link rel="stylesheet" href="<?php $this->options->themeUrl('css/fonts/linecons/css/linecons.css'); ?>"> 
  <link rel="stylesheet" href="<?php $this->options->themeUrl('css/font-awesome.min.css'); ?>">
  <link rel="stylesheet" href="<?php $this->options->themeUrl('css/bootstrap.css'); ?>">
  <link rel="stylesheet" href="<?php $this->options->themeUrl('css/xenon-core.css'); ?>">
  <link rel="stylesheet" href="<?php $this->options->themeUrl('css/xenon-components.css'); ?>">
  <link rel="stylesheet" href="<?php $this->options->themeUrl('css/xenon-skins.css'); ?>">
  <link rel="stylesheet" href="<?php $this->options->themeUrl('css/nav.css'); ?>">
  <link rel="stylesheet" href="<?php $this->options->themeUrl('css/catgotop.css'); ?>">
  <script src="<?php $this->options->themeUrl('js/jquery-3.6.0.min.js'); ?>"></script>
    <!--<script src="<?php $this->options->themeUrl('js/copyright_i.js'); ?>"></script>-->
    <script src="<?php $this->options->themeUrl('js/bootstrap.min.js'); ?>"></script>
    <script src="<?php $this->options->themeUrl('js/lazyload.min.js'); ?>"></script>
    <script src="<?php $this->options->themeUrl('js/xenon-api.js'); ?>"></script>
    <script src="<?php $this->options->themeUrl('js/xenon-toggles.js'); ?>"></script>
    <script src="<?php $this->options->themeUrl('js/xenon-custom.js'); ?>"></script>
    <script src="<?php $this->options->themeUrl('js/TweenMax.min.js'); ?>"></script>
    <script src="<?php $this->options->themeUrl('js/resizeable.js'); ?>"></script>
    <script src="<?php $this->options->themeUrl('js/catgotop.js'); ?>"></script>
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/icon.png">  
  <?php $this->header(); ?>
  <style>
    img[src=""], img:not([src]){opacity: 0}
  </style>
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?33b232dc0bfbc0abe63b0b6dbcb85a50";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>

</head> 
<body class="page-body <?php echo($_COOKIE['night'] == '1' ? 'night' : ''); ?>">

    <!-- skin-white -->
<div class="page-container">