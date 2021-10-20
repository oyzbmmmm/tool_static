<?php
/**
 * 关于
 * 
 * @package custom
 *
 */
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
 $this->need('header.php'); ?>
 <?php $this->need('sidebar.php'); ?>
         <div class="main-content" >
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default">
                        <!-- 关于网站 -->
                        <h4 class="text-gray"><?php $this->title(); ?></h4>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-12 night-bg">
                                    <?php $this->content(); ?>
                                </div>
                            </div>
                            <div class="row">
                                <?php $this->need('comments.php'); ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <!-- Main Footer -->
 <?php $this->need('footer.php'); ?>
   