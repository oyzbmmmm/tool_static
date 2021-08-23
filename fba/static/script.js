console.time();

function showtooltip() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}
showtooltip(); //鼠标提示

//进入全屏
function requestFullScreen() {
    var de = document.documentElement;
    if (de.requestFullscreen) {
        de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
    } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
    }
}

//退出全屏
function exitFullscreen() {
    var de = document;
    if (de.exitFullscreen) {
        de.exitFullscreen();
    } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
    } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
    }
}
//全屏后的计时器
var i = 5;

function endTimeinfo() {
    setTimeout(function() {
        i--;
        if (i < 0) {
            return;
        }
        $('#time').text(i);
        endTimeinfo();
        console.log(i)
    }, 1000)
}
//进入二次元按钮
$('#erciyuan_btn').click(function() {
        i = 5;
        $('.bg').css('z-index', 100);
        $('.bg2').css('z-index', 99);
        $('.bg-container').css('opacity', 1);
        $('.page').hide();
        $('.footer').hide();
        $('.ads').hide();
        $('body').addClass('to2');
        requestFullScreen();
        setTimeout(function() { $.alert('按2次Esc可返回正常位面') }, 500);
        endTimeinfo();
        setTimeout(function() {
            $('.dialog-modal-btn button').click();
        }, 5000);
    })
    //ESC退出全屏
$(document).keyup(function(e) {
    var key = e.which || e.keyCode;;
    if (key == 27 && $('body').hasClass('to2')) {
        $('.bg').css('z-index', -9);
        $('.bg2').css('z-index', -10);
        $('.bg-container').css('opacity', 0.05);
        $('.page').show();
        $('.footer').show();
        $('.ads').show();
        exitFullscreen();
    }
});

// 异步加载背景图片url
async function getImage() {
    let picUrl = '';
    let status = '';
    let image = new Image();
    await fetch('https://tool.silencetime.com/acg-api/random.php?return=json')
        .then(response => response.json())
        .then(data => {
            // picUrl = 'url("' + data.imgurl + '")';
            image.src = data.imgurl;
            status = data.code
        })
        .catch(console.error)
    image.src = await image.src;
    status = await status;
    // console.log('获取图片状态：' + status);
    if (status != 200) {
        return;
    }
    return image.src;
}
//定时器切换图片
// setInterval(changeBg, 7000); 
async function changeBg() {
    let picUrl = await getImage();
    setTimeout(async function() {
        $('.bg').attr("src", picUrl);
        await $('.bg').fadeIn(1000);
        setTimeout(function() { $('.bg2').attr("src", picUrl) }, 1000);
        setTimeout(function() { $('.bg').fadeOut(100) }, 1500);
        changeBg();
    }, 7000)
}

// 一言和必填
$('document').ready(async function() {
    await get_one_words();
    await changeBg();
    var requried = '<span class="requried"> *</span>';
    $('input.requried').before(requried);
    if (device.mobile()) {
        console.log('是否为移动端访问：' + device.mobile());
        // $.alert('请使用电脑端访问');
        $('#erciyuan_btn').hide();
    }
});
//设置定时器一言
// setInterval(get_one_words, 8000); 
function get_one_words() {
    setTimeout(function() {
        // fetch('https://international.v1.hitokoto.cn?c=c&c=l')
        fetch('https://international.v1.hitokoto.cn')
            .then(response => response.json())
            .then(data => {
                const hitokoto = document.getElementById('hitokoto_text')
                    //   hitokoto.href = 'https://hitokoto.cn/?uuid=' + data.uuid
                if (data.from_who == null) {
                    data.from_who = ''
                }
                hitokoto.innerText = data.hitokoto + '出自：' + data.from + ' - ' + data.from_who
            })
            .catch(console.error)
        get_one_words()
    }, 8000)
}

// 这是一个练习，逻辑混乱 选择类目
$('#catalog').change(function() {
    var catalog = $('#catalog').val();
    var sell_price = $('#sell_price').val();
    catalog = Number(catalog);
    console.log(catalog);
    if (catalog == 1 || catalog == 3 || catalog == 20 || catalog == 34) {
        $('#commission').val(12);
    } else if (catalog == 2) {
        $('#commission').val(45);
    } else if (catalog == 4) {
        $('#commission').val(10);
    } else if (catalog == 5 || catalog == 6 || catalog == 19) {
        if (sell_price < 10) {
            $('#commission').val(8);
        } else {
            $('#commission').val(15);
        }
    } else if (catalog == 17) {
        if (sell_price < 15) {
            $('#commission').val(8);
        } else {
            $('#commission').val(15);
        }
    } else if (catalog == 8 || catalog == 9 || catalog == 10 || catalog == 30 || catalog == 37) {
        $('#commission').val(8);
    } else if (catalog == 16 || catalog == 21 || catalog == 39) {
        $('#commission').val(20);
    } else if (catalog == 11) {
        $('#iscloth').prop("checked", true);
        $('#commission').val(17);
    } else {
        $('#commission').val(15);
    }
});

//选择按钮
$('select').not('#cur_choose').not('#currency-one').not('#currency-two').not('#catalog').change(function() {
    $('#box_gw,#box_num,#box_pcs,#package_l,#package_w,#package_h').keyup();
});

//填写尺寸input执行
$('#box_gw,#box_num,#box_pcs,#package_l,#package_w,#package_h').keyup(function() {
    // $('#CubicCm').removeClass('ripple');
    // var ship = Number($('#tijixishu').val());
    if ($('#tijixishu').val() == "1") {
        var ship = 6000;
    } else {
        ship = 5000;
    }
    // console.log(ship);
    var package_l = $('#package_l').val();
    var package_w = $('#package_w').val();
    var package_h = $('#package_h').val();
    package_l = Number(package_l);
    package_w = Number(package_w);
    package_h = Number(package_h);
    var tiji = (package_l * package_w * package_h) / ship;
    tiji = tiji.toFixed(4);
    $('#package_wh').val(tiji);
});

//重置按钮
$('#reset_btn').click(function() {
    $("input").not('#rate_i').not('#commission').not('#storage_month').not('#sea_price').not('#air_price').not('#amount-one').not('#amount-two').not('#tijixishu').not('#car_price').not('#train_price').not('.rate-hidden').val('');
    $('#amz_result').html('请填写数据');
    $('#addtag').text('');
});

$('#reload_btn').click(function() {
    $('input').not('#rate_i').not('.rate-hidden').val(15);
    $('input').keyup();
    $('.tableexport-caption').remove();
})

$('#cur_btn').click(function() {
    $('.model').show();
});
$('#cur_close').click(function() {
    $('.model').hide();
});
$('#amzbox_btn').click(function() {
    $('.box_info').show();
});
$('#box_info_close').click(function() {
    $('.box_info').hide();
});
$('#iscloth').click(function() {
    $('#end_shipping_fee').click();
    $("input").not('#currency-one').not('#currency-two').not('#amount-one').not('#amount-two').keyup();
});
$('#issmall').click(function() {
    $('#end_shipping_fee').click();
    $("input").not('#currency-one').not('#currency-two').not('#amount-one').not('#amount-two').keyup();
});
$('#isthereparty').click(function() {
    var three_party = $('#isthereparty').prop("checked");
    // console.log(three_party);
    if (three_party) {
        $('#thereparty_display').show();
    } else {
        $('#thereparty_display').hide();
    }
    $('#end_shipping_fee').click();
    $("input").not('#currency-one').not('#currency-two').not('#amount-one').not('#amount-two').keyup();
})

//重量计算按钮
$('#end_shipping_fee').click(function() {
    $('#end_shipping_fee').removeClass('ripple');
    var ship_box = $('#box_pcs').val();
    var re_gw = $('#box_gw').val();
    var re_pieces = $('#box_num').val();
    var small_light = $('#issmall').prop("checked");
    var three_party = $('#isthereparty').prop("checked");
    var cloth = $('#iscloth').prop("checked");
    var thereparty_fee = $('#thereparty_fee').val();
    var end_shipping_package_l = $('#package_l_p').val();
    var end_shipping_package_w = $('#package_w_p').val();
    var end_shipping_package_h = $('#package_h_p').val();
    end_shipping_package_l = Number(end_shipping_package_l);
    end_shipping_package_w = Number(end_shipping_package_w);
    end_shipping_package_h = Number(end_shipping_package_h);
    if (end_shipping_package_w > end_shipping_package_l || end_shipping_package_h > end_shipping_package_l || end_shipping_package_h > end_shipping_package_w) {
        $('#size_warning').html('<span style="color: red">请从大到小填写数字！</span>');
        $('#tail').val('');
        $('#end_shipping_result_is').html(' 请重填数据');
        $('#end_shipping_result').html('!');
        return false;
    } else {
        $('#size_warning').html('');
    }
    re_pieces = Number(re_pieces);
    re_gw = Number(re_gw);
    ship_box = Number(ship_box);
    var re_gw_pcs = re_gw / re_pieces;
    // o_re_wei_pcs = (re_gw_pcs / ship_box) * 2.2; //错了
    o_re_wei_pcs = re_gw_pcs * 2.2; //应该是单箱
    o_re_wei_pcs = Number(o_re_wei_pcs);
    // console.log('一箱毛重=' + re_gw);
    // console.log('一箱多少个=' + re_pieces);
    // console.log('多少箱=' + ship_box);
    // console.log('每个重=' + o_re_wei_pcs + '磅');
    var inch_weight = (end_shipping_package_l / 2.54) * (end_shipping_package_w / 2.54) * (end_shipping_package_h / 2.54) / 139;

    var currency_val = $('#cur_choose').val();
    var cur_rmb = $('#rate_usd').val();
    var cur_cad = $('#rate_cad').val();
    var cur_gbp = $('#rate_gbp').val();
    var cur_eur = $('#rate_eur').val();
    var cur_aud = $('#rate_aud').val();
    var cur_jpy = $('#rate_jpy').val();
    if (currency_val == 'USD') {
        $('.thereparty_fee_result_cur').text('美元');
        rate = 1
    } else if (currency_val == 'CAD') {
        $('.thereparty_fee_result_cur').text('加元');
        rate = cur_rmb / cur_cad
    } else if (currency_val == 'GBP') {
        $('.thereparty_fee_result_cur').text('英镑');
        rate = cur_rmb / cur_gbp
    } else if (currency_val == 'EUR') {
        $('.thereparty_fee_result_cur').text('欧元');
        rate = cur_rmb / cur_eur
    } else if (currency_val == 'AUD') {
        $('.thereparty_fee_result_cur').text('澳元');
        rate = cur_rmb / cur_aud
    } else if (currency_val == 'JPY') {
        $('.thereparty_fee_result_cur').text('日元');
        rate = cur_rmb / cur_jpy
    }
    // console.log(rate)
    // var rate = $('#rate_i').val();
    // rate = Number(rate); //艹，什么玩意儿
    var end_shipping_package_l = $('#package_l_p').val();
    var end_shipping_package_w = $('#package_w_p').val();
    var end_shipping_package_h = $('#package_h_p').val();
    var storage_month = $('#storage_month').val();
    var storage_days = storage_month * 12;
    var three_party_fee = $('#thereparty_fee_result').val();
    end_shipping_package_l = Number(end_shipping_package_l);
    end_shipping_package_w = Number(end_shipping_package_w);
    end_shipping_package_h = Number(end_shipping_package_h);
    //单件所占存储的立方英尺
    var lfyc = (end_shipping_package_l * end_shipping_package_w * end_shipping_package_h) * 0.0000353;
    // 长期仓储费用
    $('#lfyc').val(lfyc);
    if (storage_month > 12) {
        if (lfyc * 6.9 > 0.15) {
            var storage_fee_long = lfyc * 6.9 * (storage_month - 12) * rate;
            var storage_fee_long_info = '体积*6.9大于0.15，取体积计费';
        } else {
            storage_fee_long = 0.15 * rate * (storage_month - 12);
            storage_fee_long_info = '单件0.15大于体积*6.9，取固定计费';
        }
    } else {
        storage_fee_long = 0;
        storage_fee_long_info = '存储时长不足一年';
    }
    $('#long_storage_fee').val(storage_fee_long);
    $('#long_storage_fee_info').text(storage_fee_long_info);
    // console.log('单件所占存储 = ' + lfyc + '立方英尺');
    // 区分淡季和旺季
    var storage_fee_d = lfyc * 0.75 * rate * storage_month;
    var storage_fee_w = lfyc * 2.4 * rate * storage_month;

    $('#storage_month_fee_d').val(storage_fee_d);
    $('#storage_month_fee_w').val(storage_fee_w);

    if (inch_weight > o_re_wei_pcs && inch_weight && o_re_wei_pcs) {
        finally_weight = inch_weight;
        finally_weight_info = '体积重' + inch_weight.toFixed(2) + 'Lb(磅)大于实重' + o_re_wei_pcs.toFixed(2) + 'Lb(磅)，属于：';
    } else if (inch_weight < o_re_wei_pcs && inch_weight && o_re_wei_pcs) {
        finally_weight = o_re_wei_pcs;
        finally_weight_info = '实重' + o_re_wei_pcs.toFixed(2) + 'Lb(磅)大于体积重' + inch_weight.toFixed(2) + 'Lb(磅)，属于：';
    } else {
        finally_weight_info = '';
        finally_weight = NaN;
    }
    if (three_party) {
        var three_party_fee = (finally_weight * thereparty_fee).toFixed(4);
        $('#thereparty_fee_result').val(three_party_fee * rate);
    } else {
        three_party_fee = 0;
        $('#thereparty_fee_result').val(0);
    }
    $('#end_shipping_result').show();
    $('#end_shipping_result_is').show();
    $('#end_shipping_result').html(finally_weight_info);
    if (small_light && !cloth && end_shipping_package_l / 2.54 <= 15 && end_shipping_package_w / 2.54 <= 12 && end_shipping_package_h / 2.54 <= 0.75 && finally_weight <= 0.0625 * 6) {
        $('#end_shipping_result_is').html(' 轻小物品-标准小件1');
        $('#tail').val(2.16 * rate);
    } else if (small_light && !cloth && end_shipping_package_l / 2.54 <= 15 && end_shipping_package_w / 2.54 <= 12 && end_shipping_package_h / 2.54 <= 0.75 && finally_weight > 0.0625 * 6 && finally_weight <= 12 * 0.0625) {
        $('#end_shipping_result_is').html(' 轻小物品-标准小件2');
        $('#tail').val(2.35 * rate);
    } else if (small_light && !cloth && end_shipping_package_l / 2.54 <= 18 && end_shipping_package_w / 2.54 <= 14 && end_shipping_package_h / 2.54 <= 8 && finally_weight <= 0.0625 * 6) {
        $('#end_shipping_result_is').html(' 轻小物品-标准大件3');
        $('#tail').val(2.35 * rate);
    } else if (small_light && !cloth && end_shipping_package_l / 2.54 <= 18 && end_shipping_package_w / 2.54 <= 14 && end_shipping_package_h / 2.54 <= 8 && finally_weight > 0.0625 * 6 && finally_weight <= 0.0625 * 12) {
        $('#end_shipping_result_is').html(' 轻小物品-标准大件4');
        $('#tail').val(2.60 * rate);
    } else if (small_light && !cloth && ((end_shipping_package_l / 2.54 > 18 || end_shipping_package_w / 2.54 > 14 || end_shipping_package_h / 2.54 > 8) || finally_weight > 0.0625 * 12)) {
        $('#end_shipping_result_is').html(' 你选择了轻小物品-但是尺寸不合标准');
        $.alert('哦豁，尺寸不合标准, 已取消勾选');
        $('#issmall').prop("checked", false);
        $('#tail').val(''); //轻小件非服装判断结束
    } else if (!small_light && !cloth && end_shipping_package_l / 2.54 <= 15 && end_shipping_package_w / 2.54 <= 12 && end_shipping_package_h / 2.54 <= 0.75 && finally_weight <= 0.0625 * 6) {
        $('#end_shipping_result_is').html(' 标准小件1');
        $('#tail').val(2.70 * rate);
    } else if (!small_light && !cloth && end_shipping_package_l / 2.54 <= 15 && end_shipping_package_w / 2.54 <= 12 && end_shipping_package_h / 2.54 <= 0.75 && finally_weight > 0.0625 * 6 && finally_weight < 0.0625 * 12) {
        $('#end_shipping_result_is').html(' 标准小件2');
        $('#tail').val(2.84 * rate);
    } else if (!small_light && !cloth && end_shipping_package_l / 2.54 <= 15 && end_shipping_package_w / 2.54 <= 12 && end_shipping_package_h / 2.54 <= 0.75 && finally_weight > 0.0625 * 12 && finally_weight < 0.0625 * 16) {
        $('#end_shipping_result_is').html(' 标准小件3');
        $('#tail').val(3.32 * rate); //标准小件判断结束
    } else if (!small_light && !cloth && end_shipping_package_l / 2.54 <= 18 && end_shipping_package_w / 2.54 <= 14 && end_shipping_package_h / 2.54 <= 8 && finally_weight <= 0.0625 * 6) {
        $('#end_shipping_result_is').html(' 标准大件1');
        $('#tail').val(3.47 * rate);
    } else if (!small_light && !cloth && end_shipping_package_l / 2.54 <= 18 && end_shipping_package_w / 2.54 <= 14 && end_shipping_package_h / 2.54 <= 8 && finally_weight > 0.0625 * 6 && finally_weight < 0.0625 * 12) {
        $('#end_shipping_result_is').html(' 标准大件2');
        $('#tail').val(3.64 * rate);
    } else if (!small_light && !cloth && end_shipping_package_l / 2.54 <= 18 && end_shipping_package_w / 2.54 <= 14 && end_shipping_package_h / 2.54 <= 8 && finally_weight > 0.0625 * 12 && finally_weight < 0.0625 * 16) {
        $('#end_shipping_result_is').html(' 标准大件3');
        $('#tail').val(4.25 * rate);
    } else if (!small_light && !cloth && end_shipping_package_l / 2.54 <= 18 && end_shipping_package_w / 2.54 <= 14 && end_shipping_package_h / 2.54 <= 8 && finally_weight > 1 && finally_weight < 2) {
        $('#end_shipping_result_is').html(' 标准大件4 <i class="fa fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="top" title="尺寸小于18” x 14” x 8” - 重量1+ to 2 lb"></i>');
        $('#tail').val(4.95 * rate);
        showtooltip();
    } else if (!small_light && !cloth && end_shipping_package_l / 2.54 <= 18 && end_shipping_package_w / 2.54 <= 14 && end_shipping_package_h / 2.54 <= 8 && finally_weight > 2 && finally_weight < 3) {
        $('#end_shipping_result_is').html(' 标准大件5');
        $('#tail').val(5.68 * rate);
    } else if (!small_light && !cloth && end_shipping_package_l / 2.54 <= 18 && end_shipping_package_w / 2.54 <= 14 && end_shipping_package_h / 2.54 <= 8 && finally_weight > 3 && finally_weight < 20) {
        $('#end_shipping_result_is').html(' 标准大件6');
        $('#tail').val((5.68 + (finally_weight - 3) * 0.3) * rate); //标准大件判断结束

    } else if (!small_light && !cloth && (end_shipping_package_l / 2.54 < 60 && end_shipping_package_w / 2.54 < 30 && (end_shipping_package_l / 2.54 + (end_shipping_package_w / 2.54 + end_shipping_package_h / 2.54) * 2 < 130) && finally_weight < 70)) {
        $('#end_shipping_result_is').html(' 超重小件');
        $('#tail').val((8.66 + (finally_weight - 1) * 0.38) * rate); //超长小件判断结束
    } else if (!small_light && !cloth && end_shipping_package_l / 2.54 < 108 && (end_shipping_package_l / 2.54 + (end_shipping_package_w / 2.54 + end_shipping_package_h / 2.54) * 2 < 130) && finally_weight < 150) {
        $('#end_shipping_result_is').html(' 超重中件');
        $('#tail').val((11.37 + (finally_weight - 1) * 0.39) * rate); //超长中件判断结束
    } else if (!small_light && !cloth && end_shipping_package_l / 2.54 < 108 && (end_shipping_package_l / 2.54 + (end_shipping_package_w / 2.54 + end_shipping_package_h / 2.54) * 2 < 165) && finally_weight < 150) {
        $('#end_shipping_result_is').html(' 超重大件');
        $('#tail').val((76.57 + (finally_weight ? finally_weight > 90 : finally_weight = 90 - 90) * 0.79) * rate); //超长大件判断结束
    } else if (!small_light && !cloth && (end_shipping_package_l / 2.54 > 108 || (end_shipping_package_l / 2.54 + (end_shipping_package_w / 2.54 + end_shipping_package_h / 2.54) * 2 > 180) || finally_weight > 150)) {
        $('#end_shipping_result_is').html(' 特重大件，无穷大');
        $('#tail').val((138.11 + (finally_weight ? finally_weight > 90 : finally_weight = 90 - 90) * 0.79) * rate); //特大件判断结束

    } else if (cloth && small_light && end_shipping_package_l / 2.54 <= 15 && end_shipping_package_w / 2.54 <= 12 && end_shipping_package_h / 2.54 <= 0.75 && finally_weight <= 0.0625 * 6) {
        $('#end_shipping_result_is').html(' 衣服轻小物品-标准小件');
        $('#tail').val(2.16 * rate);
    } else if (cloth && small_light && end_shipping_package_l / 2.54 <= 15 && end_shipping_package_w / 2.54 <= 12 && end_shipping_package_h / 2.54 <= 0.75 && finally_weight > 0.0625 * 6 && finally_weight <= 12 * 0.0625) {
        $('#end_shipping_result_is').html(' 衣服轻小物品-标准小件');
        $('#tail').val(2.35 * rate);
    } else if (cloth && small_light && end_shipping_package_l / 2.54 <= 18 && end_shipping_package_w / 2.54 <= 14 && end_shipping_package_h / 2.54 <= 8 && finally_weight <= 0.0625 * 6) {
        $('#end_shipping_result_is').html(' 衣服轻小物品-标准大件');
        $('#tail').val(2.35 * rate);
    } else if (cloth && small_light && end_shipping_package_l / 2.54 <= 18 && end_shipping_package_w / 2.54 <= 14 && end_shipping_package_h / 2.54 <= 8 && finally_weight > 0.0625 * 6 && finally_weight <= 0.0625 * 12) {
        $('#end_shipping_result_is').html(' 衣服轻小物品-标准大件');
        $('#tail').val(2.60 * rate);
    } else if (cloth && small_light && ((end_shipping_package_l / 2.54 > 18 || end_shipping_package_w / 2.54 > 14 || end_shipping_package_h / 2.54 > 8) || finally_weight > 0.0625 * 12)) {
        $('#end_shipping_result_is').html(' 你选择了衣服轻小物品-但是尺寸不合标准，请再次确认');
        $.alert('哦豁，尺寸不合标准， 已取消勾选');
        $('#issmall').prop("checked", false);
        $('#tail').val(''); //衣服轻小件判断结束
    } else if (!small_light && cloth && end_shipping_package_l / 2.54 <= 15 && end_shipping_package_w / 2.54 <= 12 && end_shipping_package_h / 2.54 <= 0.75 && finally_weight <= 0.0625 * 6) {
        $('#end_shipping_result_is').html(' 衣服-标准小件');
        $('#tail').val(3.00 * rate);
    } else if (!small_light && cloth && end_shipping_package_l / 2.54 <= 15 && end_shipping_package_w / 2.54 <= 12 && end_shipping_package_h / 2.54 <= 0.75 && finally_weight > 0.0625 * 6 && finally_weight < 0.0625 * 12) {
        $('#end_shipping_result_is').html(' 衣服-标准小件');
        $('#tail').val(3.14 * rate);
    } else if (!small_light && cloth && end_shipping_package_l / 2.54 <= 15 && end_shipping_package_w / 2.54 <= 12 && end_shipping_package_h / 2.54 <= 0.75 && finally_weight > 0.0625 * 12 && finally_weight < 0.0625 * 16) {
        $('#end_shipping_result_is').html(' 衣服-标准小件');
        $('#tail').val(3.62 * rate); //衣服标准小件判断结束
    } else if (!small_light && cloth && end_shipping_package_l / 2.54 <= 18 && end_shipping_package_w / 2.54 <= 14 && end_shipping_package_h / 2.54 <= 8 && finally_weight <= 0.0625 * 6) {
        $('#end_shipping_result_is').html(' 衣服-标准大件1');
        $('#tail').val(3.87 * rate);
    } else if (!small_light && cloth && end_shipping_package_l / 2.54 <= 18 && end_shipping_package_w / 2.54 <= 14 && end_shipping_package_h / 2.54 <= 8 && finally_weight > 0.0625 * 6 && finally_weight < 0.0625 * 12) {
        $('#end_shipping_result_is').html(' 衣服-标准大件2');
        $('#tail').val(4.04 * rate);
    } else if (!small_light && cloth && end_shipping_package_l / 2.54 <= 18 && end_shipping_package_w / 2.54 <= 14 && end_shipping_package_h / 2.54 <= 8 && finally_weight > 0.0625 * 12 && finally_weight < 0.0625 * 16) {
        $('#end_shipping_result_is').html(' 衣服-标准大件3');
        $('#tail').val(4.65 * rate);
    } else if (!small_light && cloth && end_shipping_package_l / 2.54 <= 18 && end_shipping_package_w / 2.54 <= 14 && end_shipping_package_h / 2.54 <= 8 && finally_weight > 1 && finally_weight < 2) {
        $('#end_shipping_result_is').html(' 衣服-标准大件4');
        $('#tail').val(5.34 * rate);
    } else if (!small_light && cloth && end_shipping_package_l / 2.54 <= 18 && end_shipping_package_w / 2.54 <= 14 && end_shipping_package_h / 2.54 <= 8 && finally_weight > 2 && finally_weight < 3) {
        $('#end_shipping_result_is').html(' 衣服-标准大件5');
        $('#tail').val(6.08 * rate);
    } else if (!small_light && cloth && end_shipping_package_l / 2.54 <= 18 && end_shipping_package_w / 2.54 <= 14 && end_shipping_package_h / 2.54 <= 8 && finally_weight > 3 && finally_weight < 20) {
        $('#end_shipping_result_is').html(' 衣服-标准大件6');
        $('#tail').val((6.08 + (finally_weight - 3) * 0.3) * rate); //衣服标准大件判断结束
    } else {
        $('#end_shipping_result_is').html(' 判断逻辑出错，请检查数据');
        $('#tail').val(''); //其他情况
    }


});

// $("input, #cur_choose").not('#currency-one').not('#currency-two').not('#amount-one').not('#amount-two').on("keyup change", function() {
$("input").not('#currency-one').not('#currency-two').not('#amount-one').not('#amount-two').keyup(function() {
    if ($('#sell_price').val() >= 7 && $('#issmall').is(':checked')) {
        $.alert('哦豁，轻小物品，售价不能超7美金, 已取消勾选');
        $('#issmall').prop("checked", false);
    }
    $('#end_shipping_fee').click();
    var ship_box = $('#box_pcs').val();
    var re_gw = $('#box_gw').val();
    var re_wh = $('#package_wh').val();
    var re_pieces = $('#box_num').val();
    var buy_price = $('#price').val();
    var re_wh_l = $('#package_l').val();
    var re_wh_w = $('#package_w').val();
    var re_wh_h = $('#package_h').val();
    var sell_price = $('#sell_price').val();
    var rate = $('#rate_i').val();
    rate = Number(rate); //艹，什么玩意儿
    // console.log(rate);
    // console.log(typeof rate);
    var catalog_text = $("#catalog").find("option:selected").text();
    var commission = $('#commission').val() / 100;
    var tail = $('#tail').val();
    var other = $('#other').val();
    var iscloth = $('.iscloth').is(':checked');
    var acos = $('#acos').val();
    re_gw = Number(re_gw);
    re_wh = Number(re_wh);
    re_pieces = Number(re_pieces);
    buy_price = Number(buy_price);
    ship_box = Number(ship_box);
    re_wh_l = Number(re_wh_l);
    re_wh_w = Number(re_wh_w);
    re_wh_h = Number(re_wh_h);
    sell_price = Number(sell_price);
    tail = Number(tail);
    acos = Number(acos);
    re_gw = re_gw * ship_box;
    re_wh = re_wh * ship_box;
    var total_pieces = ship_box * re_pieces;
    var re_gw_pcs = re_gw / re_pieces;
    var re_wh_pcs = re_wh / re_pieces;
    re_gw_pcs = re_gw_pcs.toFixed(4);
    re_wh_pcs = re_wh_pcs.toFixed(4);
    var y_fee = (sell_price * commission).toFixed(4);

    //判断空值
    $("input").not('input.other_i').not('input.vat_i').each(function() {
        if ($.trim($(this).val()) == "") { // 判断value值是否为空
            $(this).css('border-color', 'red').delay(5000); //延时貌似无效
            // $(this).focus(); //太快了.mother fucker!
            // setTimeout($(this).focus(), 5000);//然并卵,卒
            return false;
        } else {
            $(this).css('border-color', '');
        }
    });

    //最低佣金
    if (y_fee < 0.3) {
        y_fee = 0.3;
    } else {
        y_fee = y_fee;
    }
    //判断采购单价是否为空
    if (buy_price == 0) {
        $('#amz_result').text('请输入采购单价');
        return false;
    }
    //同上
    if (re_gw == 0) {
        $('#amz_result').text('请输入箱子重量');
        return false;
    }
    //同上
    if (re_pieces == 0) {
        $('#amz_result').text('请输入每箱件数');
        return false;
    }
    //同上
    if (ship_box == 0) {
        $('#amz_result').text('请输入发货件数');
        return false;
    }
    //同上
    if (re_wh == 0) {
        $('#amz_result').text('请先填入装箱长宽高');
        $('#CubicCm').addClass('ripple');
        return false;
    }
    //同上
    if (sell_price == 0) {
        $('#amz_result').text('请先输入售价');
        return false;
    }
    //同上
    if (commission == 0) {
        $('#amz_result').text('请先选择类目或者手动填写佣金费率');
        return false;
    }
    //同上
    if (tail == 0) {
        $('#amz_result').text('请先填写派送尺寸或手动填写尾程运费');
        $('#end_shipping_fee').addClass('ripple');
        return false;
    }
    //同上
    if ($('#ship_choose').val() == "1") {
        var shipping_mod = '海运';
        var shipping_fee = $('#sea_price').val();
        shipping_fee = Number(shipping_fee);
    } else if ($('#ship_choose').val() == "2") {
        shipping_mod = '空运';
        shipping_fee = $('#air_price').val();
        shipping_fee = Number(shipping_fee);
    } else if ($('#ship_choose').val() == "3") {
        shipping_mod = '卡航';
        shipping_fee = $('#car_price').val();
        shipping_fee = Number(shipping_fee);
    } else if ($('#ship_choose').val() == "4") {
        shipping_mod = '铁路';
        shipping_fee = $('#train_price').val();
        shipping_fee = Number(shipping_fee);
    }
    //判断体积重还是实重
    if (re_gw > re_wh) {
        re_weight = '实重' + re_gw + '大于体积重' + re_wh.toFixed(4) + '，取实重' + re_gw + 'kg' + '-其中单件重:' + (re_gw_pcs / ship_box).toFixed(4) + 'kg';
        total_re_weight = re_gw;
        o_re_wei_pcs = re_gw_pcs / ship_box;
        o_re_wei_pcs = Number(o_re_wei_pcs);
    } else {
        re_weight = '体积重' + re_wh.toFixed(4) + '大于实重' + re_gw + '，取体积重：' + re_wh.toFixed(4) + 'kg' + '-其中单件重' + (re_wh_pcs / ship_box).toFixed(4) + 'kg';
        total_re_weight = re_wh;
        o_re_wei_pcs = re_wh_pcs / ship_box;
        o_re_wei_pcs = Number(o_re_wei_pcs);
    }
    var lfyc = Number($('#lfyc').val());
    var storage_fee_d = Number($('#storage_month_fee_d').val());
    var storage_fee_w = Number($('#storage_month_fee_w').val());
    var storage_fee_long = Number($('#long_storage_fee').val());
    var storage_month = Number($('#storage_month').val());
    var three_party_fee = Number($('#thereparty_fee_result').val())
    var money = sell_price * rate - sell_price * commission * rate - tail * rate - shipping_fee * o_re_wei_pcs - storage_fee_d * rate - buy_price - acos * sell_price * rate / 100 - storage_fee_long * rate - three_party_fee * rate - other;
    // console.log('淡季利润 = ' + money);
    var money_w = sell_price * rate - sell_price * commission * rate - tail * rate - shipping_fee * o_re_wei_pcs - storage_fee_w * rate - buy_price - acos * sell_price * rate / 100 - storage_fee_long * rate - three_party_fee * rate - other;
    // console.log('旺季利润 = ' + money_w);
    money = Number(money).toFixed(4);
    // console.log('利润= USD' + money);
    // console.log('卖价= USD' + sell_price);
    // console.log('尾程= USD' + tail);
    // console.log('运费= USD' + (shipping_fee * o_re_wei_pcs)/rate);
    // console.log('仓储旺= USD' + storage_fee_w);
    // console.log('仓储淡= USD' + storage_fee_d);
    // console.log('购买= USD' + buy_price/rate);
    // console.log('acos= USD' + acos*sell_price);
    // console.log('长期= USD' + storage_fee_long);
    // console.log('中转= USD' + three_party_fee);
    // console.log('其他= RMB' + other);
    money_w = Number(money_w).toFixed(4);

    var currency_val = $('#cur_choose').val();
    if (currency_val == 'USD') {
        var cur_result = '美元，'
    } else if (currency_val == 'CAD') {
        cur_result = '加元，'
    } else if (currency_val == 'GBP') {
        cur_result = '英镑，'
    } else if (currency_val == 'EUR') {
        cur_result = '欧元，'
    } else if (currency_val == 'AUD') {
        cur_result = '澳元，'
    } else if (currency_val == 'JPY') {
        cur_result = '日元，'
    }

    var three_party_fee = $('#thereparty_fee_result').val();
    //输出结果
    $('#amz_result').html(
        '<table class="table table-bordered table-hover table-striped" data-tableName="利润计算表">' +
        '<tbody><tr><td style="width: 25%"><span>采购价：</span></td><td><span>' + (buy_price / rate).toFixed(4) + cur_result + buy_price + '元</span></td></tr>' +
        '<tr><td><span>共发货：</span></td><td><span>' + total_pieces + '件<br>' +
        '<tr><td><span>运输方式：</span></td><td><span>' + shipping_mod + '，单价' + (shipping_fee / rate).toFixed(4) + cur_result + '，' + shipping_fee + '元/kg</span></td></tr>' +
        '<tr><td><span>重量：</span></td><td><span>' + re_weight + '</span></td></tr>' +
        '<tr><td><span>运费：</span></td><td><span>' + (shipping_fee * total_re_weight).toFixed(0) + '元，单件:' + (shipping_fee * o_re_wei_pcs / rate).toFixed(4) + cur_result + '，' + (shipping_fee * o_re_wei_pcs).toFixed(4) + '元/件</span></td></tr>' +
        '<tr><td><span>销售价格：</span></td><td><span>' + sell_price.toFixed(4) + cur_result + (sell_price * rate).toFixed(4) + '元</span></td></tr>' +
        '<tr><td><span>所属类目：</span></td><td><span>' + catalog_text + '</span></td></tr>' +
        '<tr><td><span>佣金比例：</span></td><td><span>' + commission * 100 + '%</span></td></tr>' +
        '<tr><td><span>销售佣金：</span></td><td><span>' + y_fee + cur_result + (y_fee * rate).toFixed(4) + '元</span></td></tr>' +
        '<tr><td><span>尾程派送费：</span></td><td><span>' + tail.toFixed(4) + cur_result + (tail * rate).toFixed(4) + '元</span></td></tr>' +
        '<tr><td><span>海外仓中转：</span></td><td><span>' + three_party_fee + cur_result + (three_party_fee * rate).toFixed(4) + '元</span></td></tr>' +
        '<tr><td><span>预计仓储费：</span></td><td><span>单件占用仓储：' + lfyc.toFixed(4) + '立方英尺，存放' + storage_month + '月，淡季' + storage_fee_d.toFixed(4) + cur_result + '旺季：' + storage_fee_w.toFixed(4) + cur_result + '</span></td></tr>' +
        '<tr><td><span>长期仓储费：</span></td><td><span>' + storage_fee_long + '</span></td></tr>' +
        '<tr><td><span>毛利润：</span></td><td><span>淡季：' + (money / rate).toFixed(4) + cur_result + money + '元。 旺季：' + (money_w / rate).toFixed(4) + cur_result + money_w + '元。</span></td></tr>' +
        '<tr><td><span>毛利率：</span></td><td><span>淡季：' + (((money / rate) / sell_price * 100)).toFixed(4) + '%。 旺季：' + (((money_w / rate) / sell_price * 100)).toFixed(4) + '%</span></td></tr>' +
        '<tr><td><span>费用预估：</span></td><td><span>货值' + (buy_price * total_pieces).toFixed(2) + '元，运费：' + (shipping_fee * total_re_weight).toFixed(2) + '元，共' + (buy_price * total_pieces + shipping_fee * total_re_weight).toFixed(2) + '预计利润' + (money * total_pieces).toFixed(4) + '元' + '，投资回报率：' + ((money * total_pieces) / (buy_price * total_pieces + shipping_fee * total_re_weight) * 100).toFixed(2) + '%</span></td></tr>' +
        '</tbody></table>' +
        '<button type="button" id="add_to_table" class="btn btn-success btn-block"><i class="fa fa-file-excel-o" aria-hidden="true"></i> 添加结果至下表(对比)</button>' +
        '<code class="inquiry">数据不对？去<a href="https://www.silencetime.com/archives/215/" target="_blank">提交反馈</a>,</code><span>功能有问题，Crrl+F5刷新缓存即可！</span>'
    );
    if (re_gw_pcs * re_pieces / ship_box > 22.5 && re_wh_l < 63.5 && re_wh_w < 63.5 && re_wh_h < 63.5) {
        $('#warning').show();
        $('#warning').html("箱子重量已经超过22.5kg<br>");
    } else if (re_gw_pcs * re_pieces / ship_box > 22.5 && (re_wh_l > 63.5 || re_wh_w > 63.5 || re_wh_h > 63.5)) {
        $('#warning').show();
        $('#warning').html("箱子重量已经超过22.5kg<br>箱子单边长度已超63.5cm<br>");
    } else if (re_gw_pcs * re_pieces / ship_box < 22.5 && (re_wh_l > 63.5 || re_wh_w > 63.5 || re_wh_h > 63.5)) {
        $('#warning').show();
        $('#warning').html("箱子单边长度已超63.5cm<br>");
    } else {
        $('#warning').hide();
        $('#warning').html("正常尺寸和重量");
    }
    $('.result_table').show();
    var item = 0;
    var cur_result = '$';
    $('#add_to_table').click(function() {
        $('.tableexport-caption').remove();
        if (!$('caption').hasClass('tableexport-caption')) {
            $('.exportToExcel').show();
        }
        item++;
        let currency_val = $('#cur_choose').val();
        if (currency_val == 'USD') {
            let cur_result = '$'
        } else if (currency_val == 'CAD') {
            cur_result = 'C$'
        } else if (currency_val == 'GBP') {
            cur_result = '￡'
        } else if (currency_val == 'EUR') {
            cur_result = '€'
        } else if (currency_val == 'AUD') {
            cur_result = 'A$'
        } else if (currency_val == 'JPY') {
            cur_result = 'J¥'
        }
        // cell data types (string, number, boolean, date)
        // 单元格有时候自动格式会出现bug,需要手动指定格式，ex. tableexport-date为指定日期，会被格式化为日期
        var add_content = '<tr class="can_remove"> ' +
            '<td>' + item + '</td> <!--Item-->' +
            '<td class="tableexport-string">' + cur_result + Number((buy_price / rate).toFixed(2)) + '</td> <!--采购价-->' +
            '<td class="tableexport-string">' + re_pieces + '</td> <!--每箱数量-->' +
            '<td class="tableexport-string">' + ship_box + '</td> <!--箱数-->' +
            '<td class="tableexport-string">' + Number((re_gw / ship_box).toFixed(2)) + '</td> <!--每箱毛重-->' +
            '<td class="tableexport-string">' + re_wh_l + '*' + re_wh_w + '*' + re_wh_h + '</td> <!--箱子尺寸-->' +
            '<td class="tableexport-string">' + Number((re_wh / ship_box).toFixed(2)) + '</td> <!--体积重-->' +
            '<td class="tableexport-string">' + shipping_mod + '</td> <!--运输方式-->' +
            '<td class="tableexport-string">' + cur_result + Number((shipping_fee * o_re_wei_pcs / rate).toFixed(2)) + '</td> <!--运输单价-->' +
            '<td class="tableexport-string">' + cur_result + Number((shipping_fee / rate).toFixed(2)) + '</td> <!--运费单价-->' +
            '<td class="tableexport-string">' + cur_result + Number(sell_price.toFixed(2)) + '</td> <!--售价-->' +
            '<td class="tableexport-string">' + cur_result + Number((+y_fee).toFixed(2)) + '</td> <!--佣金-->' +
            '<td class="tableexport-string">' + cur_result + Number(tail.toFixed(2)) + '</td> <!--尾程-->' +
            '<td class="tableexport-string">' + storage_month + '</td> <!--储存时长-->' +
            '<td class="tableexport-string">' + cur_result + Number(storage_fee_d.toFixed(2)) + '</td> <!--淡季存储-->' +
            '<td class="tableexport-string">' + cur_result + Number(storage_fee_w.toFixed(2)) + '</td> <!--旺-->' +
            '<td class="tableexport-string">' + cur_result + Number((money / rate).toFixed(2)) + '</td> <!--淡季利润-->' +
            '<td class="tableexport-string">' + cur_result + Number((money_w / rate).toFixed(2)) + '</td> <!--旺-->' +
            '<td class="tableexport-string">' + (((money / rate) / sell_price * 100)).toFixed(2) + '%</td> <!--淡季利率-->' +
            '<td class="tableexport-string">' + (((money_w / rate) / sell_price * 100)).toFixed(2) + '%</td> <!--旺-->' +
            '</tr>';
        $('#addtag').append(add_content);
        // 移除行，视需求
        // $('.can_remove').click(function(){
        $('.can_remove:last-child').dblclick(function() {
            $(this).remove();
            $('.tableexport-caption').remove();
            if (!$('caption').hasClass('tableexport-caption')) {
                $('.exportToExcel').show();
            }
        })
    })
});

// 导出excwl 旧版 只能csv
// $(".exportToExcel").click(function(e){
// 	var table = $(this).prev('.table2excel');
// 	if(table && table.length){
// 		var preserveColors = (table.hasClass('table2excel_with_colors') ? true : false);
// 		$(table).table2excel({
// 			exclude: ".noExl",
// 			name: "Excel Document Name",
// 			filename: "静谧时光FBA计算器" + new Date().toISOString().replace(/[\-\:\.]/g, "") + ".xls",
// 			fileext: ".xls",
// 			exclude_img: true,
// 			exclude_links: true,
// 			exclude_inputs: true,
// 			preserveColors: preserveColors
// 		});
// 	}
// });
//https://github.com/clarketm/TableExport
//导出excel新版 xslx csv txt
$(".exportToExcel").click(function() {
    /* Defaults */
    $(this).hide();
    let d = new Date().getTime()
    $("#table2excel").tableExport({
        headers: true,
        footers: true,
        formats: ["xlsx", "csv", "txt"],
        filename: "静谧时光FBA计算器" + d,
        bootstrap: false,
        exportButtons: true,
        position: "bottom",
        ignoreRows: null,
        ignoreCols: null,
        trimWhitespace: false,
        RTL: false,
        sheetname: "静谧时光FBA计算器" + d
    });
});

//btn btn-info xlsx col-4


//暗黑模式切换
$(document).ready(function() {
    if (document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") === '') {
        //设置开启时间和结束时间
        if (new Date().getHours() > 15 || new Date().getHours() < 14) {
            $('body').addClass('night');
            document.cookie = "night=1;path=/";
            console.log('夜间模式开启');
        } else {
            $('body').removeClass('night');
            document.cookie = "night=0;path=/";
            console.log('夜间模式关闭');
        }
    } else {
        var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
        if (night == '0') {
            $('body').removeClass('night');
        } else if (night == '1') {
            $('body').addClass('night');
        }
    }
});
$('#night_btn').click(function() {
    var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
    if (night == '0') {
        $('body').addClass('night');
        document.cookie = "night=1"
        console.log(' 夜间模式');
    } else {
        $('body').removeClass('night');
        document.cookie = "night=0"
        console.log(' 白天模式');
    }
});

//底部年份
var get_year = new Date();
var year = get_year.getFullYear();
$('#year').text(year);
// 导出excel
// $(function() {
// 	$(".exportToExcel").click(function(e){
// 		var table = $(this).prev('.table2excel');
// 		if(table && table.length){
// 			var preserveColors = (table.hasClass('table2excel_with_colors') ? true : false);
// 			$(table).table2excel({
// 				exclude: ".noExl",
// 				name: "Excel Document Name",
// 				filename: "myFileName" + new Date().toISOString().replace(/[\-\:\.]/g, "") + ".xls",
// 				fileext: ".xls",
// 				exclude_img: true,
// 				exclude_links: true,
// 				exclude_inputs: true,
// 				preserveColors: preserveColors
// 			});
// 		}
// 	});
// });

console.timeEnd();
console.log(`%c %c\n渣代码，但也请尊重劳动成果\n%c 静谧时光FBA计算器 %c 版本：0.1 `,
    ` padding: 50px 500px;
    margin-bottom: 15px;
    background-image: url(https://cdn.jsdelivr.net/gh/oyzbmmmm/tool_static@master/fba/static/images/hdu.gif);
    background-size: contain;
    background-repeat: no-repeat;
    color: transparent;`,
    'color: #3eaf7c; font-size: 16px;margin-bottom: 10px;',
    'background: #35495e; padding: 4px; border-radius: 3px 0 0 3px; color: #fff',
    'background: #41b883; padding: 4px; border-radius: 0 3px 3px 0; color: #fff',
);