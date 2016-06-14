//確認網址
$( document ).ready(function(){
    checkForValidUrl(window.location.href);
});
function checkForValidUrl(url) {
    if(getDomainFromUrl(url).toLowerCase()=="chan.sankakucomplex.com"){
        //添加按鈕
        var newBar = $('<div style="text-align: center"><div class="bar"></div></div>')
        var pushToArrayBtn = $('<input type="button" value="OpenOriginalPic" style="padding: 0.2em 1em"/>').click(pushClickList);
        var pushToArrayA = $('<a href="#" style="padding: 0.4em 1em;display:none">DirectUrl</a>');

        $(".content div span.thumb").append(newBar);
        $(".bar").append(pushToArrayBtn);
        $(".bar").append(pushToArrayA);

    }
}

function getDomainFromUrl(url){
    var host = "null";
    if(typeof url == "undefined" || null == url)
        url = window.location.href;
    var regex = /.*\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if(typeof match != "undefined" && null != match)
        host = match[1];
    return host;
}

var openList = new Array();
var clickList = new Array();
var sum = 0;
function pushClickList(){
    clickList.push(this);
    if (typeof tt!=='undefined') {
        clearTimeout(tt);
    }
    tt = setTimeout(function(){
        click();
    },2000);
    sum = clickList.length;
}

var times = 0;
function click(){
    if(clickList.length!=0){
        pushToArray(clickList.shift(),click);
    }
}

function pushToArray(ele,callback) {
    var url = ele.parentNode.parentNode.parentNode.children[0].href;
    var btn = ele;
    var a = ele.parentNode.children[1];
    $.ajax({
        method: "GET",
        url: url,
        cache: false,
        header: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Referer': ele.baseURI,
            'Upgrade-Insecure-Requests':1,
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/50.0.2661.102 Chrome/50.0.2661.102 Safari/537.36'
        }
    }).done(function(data){
        PageContent = data;
        //將取得結果解析至網頁中
        var img=$(PageContent).find("a#highres")[0].href;
        a.href = img;
        a.style.display = "";
        btn.style.display = "none";

        setTimeout(function(){
            (callback && typeof(callback) === "function") && callback();
        },700);
        openList.push(img);
        times++;
        if (times==sum) {
            setTimeout(function(){
                openTab();
            },1800);
        }
    }).fail(function(){
        clickList.push(ele);
        setTimeout(function(){
            click();
        },1000);
    });
}

function openTab(){
    if(openList.length!=0) {
        openNewBackgroundTab(openList.shift(),openTab);
    }
}

function openNewBackgroundTab(url,callback){
        var a = document.createElement("a");
        a.href = url; 
        var evt = document.createEvent("MouseEvents");
        //the tenth parameter of initMouseEvent sets ctrl key
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
        a.dispatchEvent(evt);
    setTimeout(function(){
        (callback && typeof(callback) === "function") && callback();
    },500);
}
