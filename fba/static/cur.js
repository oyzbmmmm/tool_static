// 配置定时器，实时刷新美元的汇率,循环更新
// setInterval(exchange, 1000);
// 又不是啥大项目，所以只访问时执行一次,然后按需手动更新！
setTimeout(exchange, 1000);

function exchange() {
    $.ajax({
        type: "get",

        url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=1%E7%BE%8E%E5%85%83%E7%AD%89%E4%BA%8E%E5%A4%9A%E5%B0%91%E4%BA%BA%E6%B0%91%E5%B8%81&co=&resource_id=5293&t=1586223308933&cardId=5293&ie=utf8&oe=gbk&cb=op_aladdin_callback&format=json&tn=baidu&alr=1&cb=jQuery110203991885021937811_1586223277956&_=1586223277958",
        /*url写异域的请求地址*/

        dataType: "jsonp",
        /*加上datatype*/

        jsonpCallback: "jQuery110203991885021937811_1586223277956",
        /*设置一个回调函数，名字随便取，和下面的函数里的名字相同，还需要跟url中cb名字相同*/
        success: function() {}

    })
}

function jQuery110203991885021937811_1586223277956(data) {
    // var title = data.Result[0].DisplayData.resultData.tplData.content1;
    var usd2rmb = data.Result[0].DisplayData.resultData.tplData.money2_num;
    $('#rate_i').val(usd2rmb);
    $('#rate_i').addClass('cur_c'); //
}

// async function get_calculate(cur) {
//     let rateResult = '';
//     await fetch('https://api.exchangerate-api.com/v4/latest/' + cur).then(res => res.json())
//         .then(data => {
//             rateResult = data.rates.CNY;
//         });
//     rateResult = await rateResult;
//     return rateResult;
// }

// $('#cur_choose').change(async function() {
//     var curChooseBtn = $('#cur_choose').val();
//     var rate = await get_calculate(curChooseBtn);
//     $('#rate_i').val(rate);
//     $('#end_shipping_fee').click();
//     $('#sell_price').keyup();
// })
//使用异步时，汇率老是出现bug, 心力交瘁，只能使用笨办法固定传值，防止意外！
$('document').ready(function(){
    get_calculate();
})

function get_calculate() {
    fetch(`https://api.exchangerate-api.com/v4/latest/USD`).then(res => res.json()).then(data =>
    {
        const rate_usd = data.rates.CNY;
        $('#rate_usd').val(rate_usd); //
    });
    fetch(`https://api.exchangerate-api.com/v4/latest/CAD`).then(res => res.json()).then(data =>
    {
        const rate_cad = data.rates.CNY;
        $('#rate_cad').val(rate_cad); //
    });
    fetch(`https://api.exchangerate-api.com/v4/latest/GBP`).then(res => res.json()).then(data =>
    {
        const rate_gbp = data.rates.CNY;
        $('#rate_gbp').val(rate_gbp); //
    });
    fetch(`https://api.exchangerate-api.com/v4/latest/EUR`).then(res => res.json()).then(data =>
    {
        const rate_eur = data.rates.CNY;
        $('#rate_eur').val(rate_eur); //
    });
    fetch(`https://api.exchangerate-api.com/v4/latest/AUD`).then(res => res.json()).then(data =>
    {
        const rate_aud = data.rates.CNY;
        $('#rate_aud').val(rate_aud); //
    });
    fetch(`https://api.exchangerate-api.com/v4/latest/JPY`).then(res => res.json()).then(data =>
    {
        const rate_jpy = data.rates.CNY;
        $('#rate_jpy').val(rate_jpy); //
    });
}

$('#cur_choose').change(function() {
    if ($('#cur_choose').val() == 'USD') {
        var rate = $('#rate_usd').val();
        rate = Number(rate); //艹，什么玩意儿
    } else if ($('#cur_choose').val() == 'CAD') {
        rate = $('#rate_cad').val();
        rate = Number(rate); //艹，什么玩意儿
    } else if ($('#cur_choose').val() == 'GBP') {
        rate = $('#rate_gbp').val();
        rate = Number(rate); //艹，什么玩意儿
    } else if ($('#cur_choose').val() == 'EUR') {
        rate = $('#rate_eur').val();
        rate = Number(rate); //艹，什么玩意儿
    } else if ($('#cur_choose').val() == 'AUD') {
        rate = $('#rate_aud').val();
        rate = Number(rate); //艹，什么玩意儿
    } else if ($('#cur_choose').val() == 'JPY') {
        rate = $('#rate_jpy').val();
        rate = Number(rate); //艹，什么玩意儿
    }
    $('#rate_i').val(rate);
    $('#end_shipping_fee').click();
    $('#sell_price').keyup();
})

// 获取节点
const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const swap = document.getElementById("swap");
const rateEl = document.getElementById("rate");
// 通过fetch获取汇率并实现dom更新
function calculate() {
    const currency_one = currencyEl_one.value; //获取到是什么交换
    const currency_two = currencyEl_two.value; //什么
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`).then(res => res.json()).then(data =>
        /*下载数据,然后转换为json数据,然后是把数据赋值给*/
        {
            const rate = data.rates[currency_two];
            /*rates就是api里面的数组.意思是1块钱人民币转换成rates[currency_two]数组里面的值是多少.*/
            rateEl.innerText = `1${currency_one}=${rate}${currency_two}`; //1CNY = 0.317255FJD.ratee就是转换的利率
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2); //人民币比如20转换成美元就是20rate就是一块钱人民币转换成美元是多少。*起来就得出结果了。。
        }); /*汇率的api*/

}
// calculate(); //先执行一次
currencyEl_one.addEventListener("change", calculate); //左上角的动西
amountEl_one.addEventListener("input", calculate); //右上角的东西
currencyEl_two.addEventListener("change", calculate); //左下角的东西
amountEl_two.addEventListener("input", calculate); //右下角的东西
swap.addEventListener("click", () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate(); //刷新把.
}); //交换的按钮,按下第二次就是美元兑换成人民币是多少。