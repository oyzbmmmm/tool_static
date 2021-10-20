<section class="sousuo">
  <div class="search">
    <div class="search-box">
      <span class="search-icon" style="background: url(<?php $this->options->themeUrl('images/search_icon.png'); ?>) 0px 0px; opacity: 1;"></span>
      <input autofouces type="text" id="txt" class="search-input"  autocomplete="off"  placeholder="《《 小图标可切换搜索引擎">
      <div class="input_clear" style="display:none" for="txt"><i class="fa fa-times-circle"></i></div>
      <button class="search-btn" id="search-btn"><i class="fa fa-search"></i></button>
    </div>
    <!-- 搜索热词 -->
    <div class="box search-hot-text" id="box" style="display: none;">
      <ul></ul>
    </div>
    <!-- 搜索引擎 -->
    <div class="search-engine" style="display: none;">
      <div class="search-engine-head">
        <strong class="search-engine-tit">选择您的默认搜索引擎：</strong>
        <div class="search-engine-tool">搜索热词： <span id="hot-btn"></span></div>
      </div>
      <ul class="search-engine-list search-engine-list_zmki_ul"> 
      </ul>
    </div>
   </div>
</section> 
<!--<script src="https://silencetime.oss-cn-guangzhou.aliyuncs.com/WebStack/js/js/index.min.js"></script>-->
  <script src="<?php $this->options->themeUrl('js/js/index.min.js'); ?>"></script>
  <script src="<?php $this->options->themeUrl('js/js/zui.js'); ?>"></script>
<!--<script src="https://silencetime.oss-cn-guangzhou.aliyuncs.com/WebStack/js/js/zui.js"></script>-->
<script>
$(".search-input").focus(function() {
    $(this).parent().children(".input_clear").show();
});
$(".search-input").blur(function() {
    if ($(this).val() == '') {
        $(this).parent().children(".input_clear").hide();
    }
});
$(".input_clear").click(function() {
    $(this).parent().find('.search-input').val('');
    $(this).hide();
    $(".search-input").focus();
});
</script>