function getEle(ele) {
    return document.querySelector(ele);
}
var head = getEle("#head");
var winW = window.innerWidth;
var winH = window.innerHeight;
var desW = 640;
var desH = 960;
if (winW / winH < desW / desH) {
    head.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    head.style.webkitTransform = "scale(" + winW / desW + ")";
}
//1、首页扫描加载
var load = getEle("#loading");
var processBox = getEle("#processBox");
var process = getEle("#process");
var scanning = getEle("#scanning");
var contents = document.getElementById('contents');
loading();
function loading() {
    processBox.addEventListener("touchstart", touch, false);
    processBox.addEventListener("touchend", endTouch, false);
}
function touch(e) {
    var target = e.target;
    if (target.parentNode.className === "processBox") {
        scanning.style.display = 'block';
        process.style.display = 'block';
        function first(callback) {
            var timer1 = window.setTimeout(function lazy() {
                process.style.webkitTransform = 'translate(0,-350px)';
                process.style.webkitTransition = "1s";
                window.clearInterval(timer1);
            }, 0);
            var timer2 = window.setTimeout(function dis() {
                callback && callback();
                contents.style.display = 'block';
                page1();
                window.clearInterval(timer2);
            }, 1000);
            var timer3 = window.setTimeout(function () {
                $('.homePage').remove();
                window.clearInterval(timer3);
            }, 1500)
        }

        first(callback);
        function callback() {
            load.className = 'loading';
        }
    }
    slidePage();
}
function endTouch() {
    contents.className = "";
}
//基本信息
var eye = getEle("#eye");
function page1() {
    var font = getEle("#font");
    var flower = getEle("#flower");
    var p1_bg = getEle("#p1_bg");
    var timer = window.setTimeout(function () {
        eye.className = 'eye';
        p1_bg.className = 'lazy';
        font.className = 'lazy';
        flower.className = 'flower';
        list();
    }, 1000);
}
function list() {
    var list = document.getElementById('list');
    var oLs = list.getElementsByTagName('li');
    var index = 0;
    var timer1 = window.setInterval(function () {
        zhufengAnimate(oLs[index], {opacity: 1}, 1000);
        index++;
        if (index >= oLs.length) {
            window.clearInterval(timer1);
        }
    }, 1000)
}
function slidePage() {
    var step = 1 / 2;
    var oLis = document.querySelectorAll('#main>li');
    console.log(oLis);
    [].forEach.call(oLis, function () {
        var oLi = arguments[0];
        oLi.index = arguments[1];
        oLi.addEventListener("touchstart", start, false);
        oLi.addEventListener("touchmove", move, false);
        oLi.addEventListener("touchend", end, false);
    });
    function start(e) {
        if (this.flag)return;
        this.startY = e.changedTouches[0].pageY;
    }

    function move(e) {
        this.flag = true;
        e.preventDefault();
        var moveY = e.changedTouches[0].pageY;
        var movePos = moveY - this.startY;
        var index = this.index;
        [].forEach.call(oLis, function () {
            if (arguments[1] != index) {
                arguments[0].style.display = "none";
            }
            arguments[0].className = "";
        });
        if (movePos > 0) {
            this.prevsIndex = index == oLis.length - 1 ? 0 : index + 1;
            oLis[this.prevsIndex].style.webkitTransform = "translate(0," + (-winH + movePos) + "px)";
        } else if (movePos < 0) {
            this.prevsIndex = index == 0 ? oLis.length - 1 : index - 1;
            oLis[this.prevsIndex].style.webkitTransform = "translate(0," + (winH + movePos) + "px)";
        }
        else {
            this.flag = false;
        }
        oLis[this.prevsIndex].style.display = "block";
        oLis[this.prevsIndex].className = "zIndex";
        oLis[index].style.webkitTransform = 'translate(0,' + movePos + 'px) scale(' + (1 - Math.abs(movePos) / winH * step) + ')';
    }

    function end(e) {
        if (this.flag) {
            oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
            oLis[this.index].style.webkitTransform = 'translate(0,0) scale(' + (1 - step) + ')';
            oLis[this.index].style.webkitTransition = "0.3s";
            oLis[this.prevsIndex].style.webkitTransition = "0.3s";
            oLis[this.prevsIndex].addEventListener("webkitTransitionEnd", function () {
                this.style.webkitTransition = "";
            });
            this.flag = false;
        }

    }
}