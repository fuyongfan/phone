function getEle(ele) {
    return document.querySelector(ele);
}
var main = getEle("#main");
var winW = window.innerWidth;
var winH = window.innerHeight;
var desW = 640;
var desH = 1008;
if (winW / winH < desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}

//1、首页扫描加载
var load = getEle("#loading");
var processBox = getEle(".processBox");
var process = getEle("#process");
var scanning = getEle("#scanning");
var contents = document.getElementById('contents');
function loading() {
    processBox.addEventListener("touchstart", touch, false);
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
                contents.style.display = 'block';
                callback && callback();
                page1();
                window.clearInterval(timer2);
            }, 500);
        }

        first(callback);
        function callback() {
            load.className = 'loading';
        }
    }

}
loading();


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
    var left = document.querySelectorAll(".left>img");
    var right = document.querySelectorAll(".right");
    var index = 0;
    var timer1 = window.setInterval(function () {
        zhufengAnimate(left[index], {opacity: 1}, 1000);
        zhufengAnimate(right[index], {opacity: 1}, 1000);
        index++;
        console.log(index);
        if (index >= left.length) {
            window.clearInterval(timer1);
        }
    }, 1000)
}
//上下滑屏
slidePage();
function slidePage() {
    var oLis = document.querySelectorAll('#main>li');
    var step = 1 / 2;
    var bOk = true;
    oLis[this.prevIndex] = 0;
    [].forEach.call(oLis, function () {
        var oLi = arguments[0];
        oLi.index = arguments[1];
        oLi.addEventListener("touchstart", start, false);
    });

    function start(e) {
        if (bOk == false) return;
        bOk = false;
        this.startY = e.changedTouches[0].pageY;
        [].forEach.call(oLis, function () {
            var oLi = arguments[0];
            if (arguments[1] != oLi.index) {
                arguments[0].style.display = "none";
            }
            arguments[0].className = "";
        });
        [].forEach.call(oLis, function () {
            var oLi = arguments[0];
            oLi.index = arguments[1];
            oLi.addEventListener("touchmove", move, false);
        });
        function move(e) {
            var touch = e.changedTouches[0].pageY;
            if (touch < this.startY) {//up
                this.prevIndex = this.index == oLis.length - 1 ? 0 : this.index + 1;
                oLis[this.prevIndex].style.webkitTransform = 'translate(0,' + (winH + touch - this.startY) + 'px)';
            }
            else if (touch > this.startY) {//dowm
                this.prevIndex = this.index == 0 ? oLis.length - 1 : this.index - 1;
                oLis[this.prevIndex].style.webkitTransform = 'translate(0,' + (-winH + touch - this.startY) + 'px)';
            }
            else {
                bOk = true;
            }
            this.style.webkitTransform = 'translate(0,' + (touch - this.startY) * step + 'px) scale(' + (1 - Math.abs(touch - this.startY) / winH * step) + ')';
            oLis[this.prevIndex].className = 'zIndex';
            oLis[this.prevIndex].style.display = 'block';
            [].forEach.call(oLis, function () {
                var oLi = arguments[0];
                oLi.index = arguments[1];
                oLi.addEventListener("touchend", end, false);
            });
            function end(e) {
                var touch = e.changedTouches[0].pageY;
                if (touch < this.startY) {//up
                    this.style.webkitTransform = 'translate(0,' + (-winH) * step + 'px) scale(' + (1 - step) + ')';
                }
                else if (touch > this.startY) {//dowm
                    this.style.webkitTransform = 'translate(0,' + winH * step + 'px) scale(' + (1 - step) + ')';
                }
                else {
                    bOk = true;
                }
                oLis[this.prevIndex].style.webkitTransform = 'translate(0,0)';
                oLis[this.prevIndex].style.webkitTransition = '.3s';
                this.style.webkitTransition = '.3s';
                var _this = this;
                oLis[this.prevIndex].addEventListener("webkitTransitionEnd", function () {
                    _this.style.webkitTransition = "";
                });
                oLis[this.prevIndex].addEventListener("webkitTransformEnd", function () {
                    _this.style.webkitTransform = "";
                });
            }
        }
    }
}