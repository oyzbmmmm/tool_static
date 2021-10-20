<?php
global $categories,$hidecategries,$explore_categories;
if (!$categories or !$hidecategries){
    // 合并两个分类
    $hidecategries = $this->options->hidecategories;
    $hidecategries = str_replace(" ", "", $hidecategries);
    $hidecategries = explode("||",$hidecategries);

    if (!empty($explore_categories and !empty($hidecategries)))
        $hidecategries = array_merge($hidecategries,$explore_categories);
    elseif (!empty($explore_categories))
        $hidecategries = $explore_categories;

    $categories = null;
    $this->widget('Widget_Metas_Category_List')->to($categories);
}
?>
        <div class="sidebar-menu toggle-others fixed">
            <div class="sidebar-menu-inner">
                <header class="logo-env">
                    <!-- logo -->
                    <div class="logo">
                        <a href="<?php $this->options->siteUrl();?>" class="logo-expanded">
                            <img class="logo_size" src="<?php $this->options->Biglogo(); ?>" width="100%" alt="<?php $this->options->IndexName(); ?>" />
                        </a>
                    </div>
                    <div class="mobile-menu-toggle visible-xs">
                        <a href="#" data-toggle="mobile-menu">
                            <i class="fa-bars"></i>
                        </a>
                    </div>
                </header>
                <ul id="main-menu" class="main-menu">
                    <?php $this->widget('Widget_Metas_Category_List')->to($categorys); ?>
                     <?php while($categorys->next()): 
                         if (!($this->user->hasLogin()) and $hidecategries and (in_array($categories->mid,$hidecategries) or !($this->user->hasLogin()) and ($categories->parent and in_array($categories->parent,$hidecategries)))){continue;}
                     ?>
                         <?php if ($categorys->levels === 0): ?>
                             <?php $children = $categorys->getAllChildren($categorys->mid); ?>
                             <?php if (empty($children)) { ?>
                                 <li>
                                     <a href="<?php if ($this->is('index')): ?><?php else: ?>/<?php endif; ?>#<?php $categorys->name();?>" class="smooth">
                                        <i class="fa fa-<?php $categorys->slug();?>"></i>
                                        <span class="title"><?php $categorys->name(); ?></span>
                                     </a>
                                 </li>
                             <?php } else { ?>
                                 <li>
                                     <a>
                                        <i class="fa fa-<?php $categorys->slug();?>"></i>
                                        <span class="title"><?php $categorys->name(); ?></span>
                                        <?php if (in_array($categorys->name, ['跨境营销', '影视资源'])): ?>
                                          <span class="label label-pink pull-right hidden-collapsed">Hot</span>
                                        <?php endif; ?>
                                     </a>
                                     <ul>
                                        <?php foreach ($children as $mid) { ?>
                                        <?php $child = $categorys->getCategory($mid); ?>
                                        <li>
                                            <a href="<?php if ($this->is('index')): ?><?php else: ?>/<?php endif; ?>#<?php echo $child['name'];?>" class="smooth"><i class="fa fa-<?php echo $child['slug'];?>"></i><?php echo $child['name']; ?>
                                            </a>
                                        </li>
                                        <?php } ?>
                                    </ul>
                                 </li>
                             <?php } ?>
                         <?php endif; ?>
                     <?php endwhile; ?>
                     <li class="submit-tag">
                        <a href="<?php $this->options->Isabout(); ?>">
                            <i class="linecons-heart"></i>
                            <span class="smooth">关于本站</span>
                            <!--span class="label label-Primary pull-right hidden-collapsed">♥</span-->
                        </a>
                    </li>
                </ul>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2698946021741336"
     crossorigin="anonymous"></script>
                <!-- i.silencetime -->
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-2698946021741336"
                     data-ad-slot="4259563926"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                <script>
                     (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>
        </div>