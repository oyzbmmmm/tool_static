<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; $this->need('header.php'); ?>
<?php $this->need('sidebar.php'); 
global $categories,$hidecategries,$explore_categories; // in sidebar.php

?>
<!--顶部美化开始-->
<div class="board">
    <div class="left">
        <ul class="user-info-menu left-links list-inline list-unstyled">
            <li>
                <span class="board-title zmki_wap_zsy1">
                    <a href="https://www.silencetime.com" ><i class="fa fa-home  "></i> 首页</a>
                </span>
            </li>
            <li>
                <span class="board-title">
                    <a href="<?php $this->options->zmki_links(); ?>"><i class="fa fa-plus-square  " ></i> 收录提交</a>
                </span>
            </li>
            <li>
                <span class="board-title ">
                    <a href="<?php $this->options->zmki_url(); ?>" target="_blank"><i class="fa fa-heart xiaotubiao" style="color: #fb5962;"></i>&nbsp;<?php $this->options->zmki_name(); ?></a>
                </span>
            </li>
            <!--li>
                <div class="zmki_wap" id="tp-weather-widget">
            </li-->
            <?php if($this->options->zmki_ah == '1'): ?>
            <li>
                <div class="zmki_yldh zmki_wap_zsy2" title="切换模式"><a href="javascript:switchNightMode()" target="_self"><i class="fa fa-adjust"></i></a></div>
            </li>
            <?php endif; ?>
        </ul>
    </div>
</div>
<div class="main-content">
    <!--顶部美化结束-->
    <!--顶部新增模块开始	-->
    <?php if($this->options->isSearch == '1'): ?>
        <?php $this->need('search.php'); ?>
    <?php endif; ?>
    <?php Typecho_Widget::widget('Widget_Stat')->to($stat); ?>
    <?php $this->widget('Widget_Metas_Category_List')->to($categories); ?>
    <!--判断是否为隐藏分类，是则跳出循环，用户登录则不跳-->
    <?php while ($categories->next()): 
        if (!($this->user->hasLogin()) and $hidecategries and (in_array($categories->mid,$hidecategries) or !($this->user->hasLogin()) and ($categories->parent and in_array($categories->parent,$hidecategries)))){
            continue;
        }
    ?>
        <?php if(count($categories->children) === 0): ?>
        <?php $this->widget('Widget_Archive@category-' . $categories->mid, 'order=order&pageSize=10000&type=category', 'mid=' . $categories->mid)->to($posts); ?>
        <h4 class="text-gray"><i class="linecons-tag" style="margin-right: 7px;" id="<?php $categories->name(); ?>"></i><?php $categories->name(); ?></h4>
        <div class="row">
            <?php while ($posts->next()): ?>
            <div class="col-sm-3">
                <?php if($this->options->isLink == '1'): ?>
                <div class="xe-widget xe-conversations box2 label-info" onclick="window.open('<?php echo $posts->fields->url;?>', '_blank')" data-toggle="hover" data-trigger="hover" data-placement="top" title="" data-content="<?php echo $posts->fields->text;?>">
                    <div class="xe-comment-entry">
                        <a class="xe-user-img">
                            <?php if($posts->fields->logo != null): ?>
                            <img data-src="<?php echo $posts->fields->logo;?>" class="lazyload img-circle" width="50" height="50">
                            <?php else: ?>
                            <img data-src="https://api.ooii.io/icon/get.php?url=<?php echo $posts->fields->url;?>.png" class="lazyload img-circle" width="50" height="50">
                            <?php endif ?>
                        </a>
                        <div class="xe-comment">
                            <a class="xe-user-name overflowClip_1">
                                <?php if($posts->fields->itag): ?>
                                <strong class="link-i"><?php $posts->title(); ?></strong>
                                <!-- 增加热门链接颜色 -->
                                <span class="label label-pink pull-left hidden-collapsed"><?php $posts->fields->itag() ?></span>
                                <?php elseif($posts->fields->ntag): ?>
                                <strong class="link-n"><?php $posts->title(); ?></strong>
                                <!-- 增加推荐链接颜色 -->
                                <span class="label label-info pull-left hidden-collapsed"><?php $posts->fields->ntag() ?></span>
                                <?php else: ?>
                                <strong><?php $posts->title(); ?></strong>
                                <?php endif; ?>
                            </a>
                            <p class="overflowClip_2">
                                <?php if($posts->fields->country): ?>
                                    <!-- 判断字段，描述改为时区显示 -->
                                    <span><?php $posts->fields->local(); ?><i class="fa fa-clock-o"></i></span>
                                    <span id="<?php $posts->fields->country(); ?>" class="text-info"></span><span id="savtime"></span>
                                <?php else: ?>
                                    <?php echo $posts->fields->text;?>
                                <?php endif; ?>
                            </p>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
            </div>
            <?php endwhile; ?>
        </div>
        <br />
        <?php endif; ?>
    <?php endwhile; ?>
    <?php $this->need('footer.php'); ?>
    <style>
        /*单栏*/
        
        <?php if($this->options->zmki_pcsl=='0'): ?>.col-sm-3 {
            width: 100%;
        }
        
        <?php endif;
        ?>
        /*双栏*/
        
        <?php if($this->options->zmki_pcsl=='1'): ?>.col-sm-3 {
            width: 50%;
        }
        
        <?php endif;
        ?>
        /*三栏*/
        
        <?php if($this->options->zmki_pcsl=='2'): ?>.col-sm-3 {
            width: 33%;
        }
        
        <?php endif;
        ?>
        /*四栏*/
        
        <?php if($this->options->zmki_pcsl=='3'): ?>.col-sm-3 {
            width: 25%;
        }
        
        <?php endif;
        ?>
        /*五栏*/
        
        <?php if($this->options->zmki_pcsl=='4'): ?>.col-sm-3 {
            width: 20%;
        }
        
        <?php endif;
        ?>
        /*六栏*/
        
        <?php if($this->options->zmki_pcsl=='5'): ?>.col-sm-3 {
            width: 16.6%;
        }
        
        <?php endif;
        ?>
        /*七栏*/
        
        <?php if($this->options->zmki_pcsl=='6'): ?>.col-sm-3 {
            width: 14.2%;
        }
        
        <?php endif;
        ?>
        /*八栏*/
        
        <?php if($this->options->zmki_pcsl=='7'): ?>.col-sm-3 {
            width: 12.5%;
        }
        
        <?php endif;
        ?>
        /*手机端双栏显示 常规尺寸*/
        
        @media (max-width:768px) {
            <?php if($this->options->zmki_wapsl=='0'): ?>.col-sm-3 {
                width: 100%;
            }
            <?php endif;
            ?><?php if($this->options->zmki_wapsl=='1'): ?>.col-sm-3 {
                width: 50%;
                float: left;
            }
            .xe-widget.xe-conversations {
                position: relative;
                background: #fff;
                margin-bottom: 0px;
            }
            <?php endif;
            ?><?php if($this->options->zmki_wapsl=='2'): ?>.col-sm-3 {
                width: 33%;
                float: left;
                position: relative;
                min-height: 1px;
                padding-left: 1px!important;
                padding-right: 1px!important;
            }
            <?php endif;
            ?>
        }
    </style>
</div>