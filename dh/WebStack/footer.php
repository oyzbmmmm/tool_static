<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit;?>
<footer class="main-footer sticky footer-type-1">
                <div class="footer-inner">
                     
                    <div class="footer-text">
				    <!--友情链接-->
				    <?php if($this->options->zmki_footer_links == '0'): ?>
				    <div class="links_zmki zmki_footer_mar">
					<span>友情链接:</span> 
					<?php Links_Plugin::output(); ?>  
					</div>
					<br>
					<?php endif; ?>
                     
                    
                    <!--站点运行时间开始--> 
                    <div class="zmki_footer_mar">
                       <?php if($this->options->zmki_time_no == '1'): ?>
				 
					                  站点已稳定运行：<SPAN id=span_dt_dt style="color: #2F889A;"></SPAN> 
					                  <script language=javascript>function show_date_time(){
					                    window.setTimeout("show_date_time()", 1000);
					                    BirthDay=new Date("<?php $this->options->zmki_time(); ?> ");
					                    today=new Date();
					                    timeold=(today.getTime()-BirthDay.getTime());
					                    sectimeold=timeold/1000
					                    secondsold=Math.floor(sectimeold);
					                    msPerDay=24*60*60*1000
					                    e_daysold=timeold/msPerDay
					                    daysold=Math.floor(e_daysold);
					                    e_hrsold=(e_daysold-daysold)*24;
					                    hrsold=Math.floor(e_hrsold);
					                    e_minsold=(e_hrsold-hrsold)*60;
					                    minsold=Math.floor((e_hrsold-hrsold)*60);
					                    seconds=Math.floor((e_minsold-minsold)*60);
					                    span_dt_dt.innerHTML='<font style=color:#C40000>'+daysold+'</font> 天 <font style=color:#C40000>'+hrsold+'</font> 时 <font style=color:#C40000>'+minsold+'</font> 分 <font style=color:#C40000>'+seconds+'</font> 秒';
					                    }show_date_time();</script> 
					                     <?php endif; ?> 
                    <!--站点运行时间结束-->
                    </div>
                </div>
            </footer>
        </div>
	</div>
    
<?php if ($this->is('index')): ?>
    <script type="text/javascript">
    var href = "";
    var pos = 0;
    $("a.smooth").click(function(e) {
        $("#main-menu li").each(function() {
            $(this).removeClass("active");
        });
        $(this).parent("li").addClass("active");
        e.preventDefault();
        href = $(this).attr("href");
        pos = $(href).position().top - 30;
        $("html,body").animate({
            scrollTop: pos
        }, 500);
    });
    </script>
<?php endif; ?> 
    <script type="text/javascript">
	 <!--//夜间模式-->    
    <?php if($this->options->zmki_ah == '1'): ?>  
(function(){
    if(document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") === ''){
        if(new Date().getHours() > 15 || new Date().getHours() < 14){
            document.body.classList.add('night');
            document.cookie = "night=1;path=/";
            console.log('夜间模式开启');
        }else{
            document.body.classList.remove('night');
            document.cookie = "night=0;path=/";
            console.log('夜间模式关闭');
        }
    }else{
        var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
        if(night == '0'){
            document.body.classList.remove('night');
        }else if(night == '1'){
            document.body.classList.add('night');
        }
    }
})();
//夜间模式切换
function switchNightMode(){
    var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
    if(night == '0'){
        document.body.classList.add('night');
        document.cookie = "night=1;path=/"
        console.log(' ');
    }else{
        document.body.classList.remove('night');
        document.cookie = "night=0;path=/"
        console.log(' ');
    }
}
<?php endif; ?> 

</script>
<script>
$(function () { 
$("[data-toggle='hover']").popover();
});
$("img.lazyload").lazyload();
</script>
<script>
function startTime() {
    document.getElementById('us').innerHTML = calcTime(-8);
    document.getElementById('ca').innerHTML = calcTime(-5);
    document.getElementById('mx').innerHTML = calcTime(-6);
    document.getElementById('swe').innerHTML = calcTime(+1);
    document.getElementById('ae').innerHTML = calcTime(+4);
    document.getElementById('sg').innerHTML = calcTime(+8);
    document.getElementById('nl').innerHTML = calcTime(+1);
    document.getElementById('br').innerHTML = calcTime(-3);
    document.getElementById('tu').innerHTML = calcTime(+2);
    document.getElementById('in').innerHTML = calcTime(+5.5);
    document.getElementById('es').innerHTML = calcTime(+1);
    document.getElementById('it').innerHTML = calcTime(+1);
    document.getElementById('jp').innerHTML = calcTime(+9);
    document.getElementById('fr').innerHTML = calcTime(+1);
    document.getElementById('au').innerHTML = calcTime(+10);
    document.getElementById('pl').innerHTML = calcTime(+1);
    document.getElementById('de').innerHTML = calcTime(+1);
    document.getElementById('uk').innerHTML = calcTime(+0);
    t = setTimeout('startTime()', 1000)
}
startTime();
function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i
}
function calcTime(offset) {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000 * offset));
    var da = nd.getDate();
    var h = nd.getHours();
    var m = nd.getMinutes();
    var s = nd.getSeconds();
    da = checkTime(da);
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    return h + ":" + m + ":" + s + " (" + da + "号）"
}

</script>
<div class="back-to-top cd-top faa-float animated cd-is-visible" style="top: -900px;"></div>
</body>
</html>