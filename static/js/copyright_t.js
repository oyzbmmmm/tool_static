

//禁止F12
function fuckyou() {
    // window.close(); //关闭当前窗口(防抽)，可选但没必要
    window.location.replace('../static/pages/cxk_t.html'); //cxk
    // window.location = "about:blank"; //将当前窗口跳转置空白页
}

//判断F12审查元素

function ck() {
    console.profile();
    console.profileEnd();
    //我们判断一下profiles里面有没有东西，如果有，肯定有人按F12了，没错！！
    if (console.clear) {
        console.clear()
    };
    if (typeof console.profiles == "object") {
        return console.profiles.length > 0;
    }
}

function hehe() {
    if ((window.console && (console.firebug || console.table && /firebug/i.test(console.table()))) || (typeof opera == 'object' && typeof opera.postError == 'function' && console.profile.length > 0)) {
        fuckyou();
    }
    if (typeof console.profiles == "object" && console.profiles.length > 0) {
        fuckyou();
    }
}
hehe();
function click(e) {
    if (document.all) {
        if (event.button == 2 || event.button == 3) {
            alert("欢迎光临寒舍，有什么需要帮忙的话，请与站长联系！谢谢您的合作！！！");
            oncontextmenu = 'return false';
        }
    }
    if (document.layers) {
        if (e.which == 3) {
            oncontextmenu = 'return false';
        }
    }
}
if (document.layers) {
    fuckyou();
    document.captureEvents(Event.MOUSEDOWN);
}
document.onmousedown = click;
document.oncontextmenu = new Function("return false;")
document.onkeydown = document.onkeyup = document.onkeypress = function() {
    if (window.event.keyCode == 123) {
        fuckyou();
        window.event.returnValue = false;
        return (false);
    }
}

window.onresize = function() {
    if ((window.outerHeight - window.innerHeight) > 200 || (window.outerWidth - window.innerWidth) > 200)
    //判断当前窗口内页高度差或者宽度差，如果大于200，那么呵呵
        fuckyou();
}

//禁止右键
if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN);
}
document.onmousedown = click;
document.oncontextmenu = new Function("return false;")
document.onkeydown = document.onkeyup = document.onkeypress = function() {
    if (window.event.keyCode == 12) {
        window.event.returnValue = false;
        return (false);
    }
}

function getYear() {
    var copyRy = new Date();
    var coprRys = coprRy.getYear;
    return coprRys
}
