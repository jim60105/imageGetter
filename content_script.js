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

function pushClickList(){
    var url = this.parentNode.parentNode.parentNode.children[0].href;
    var btn = this;
    var a = this.parentNode.children[1];
    clickList.push([url,btn,a]);
    if (typeof tt!=='undefined') {
        clearInterval(tt);
    }
    tt = setInterval(function(){
        click();
        clearInterval(tt);
    },2000);
}

function click(){
    while(clickList.length!=0){
        pushToArray(clickList.shift(),click());
    }
}

function pushToArray([url,btn,a],callback) {
    $.get(url,function(data){
        PageContent = data;
        //將取得結果解析至網頁中
        var img=$(PageContent).find("a#highres")[0].href;
        a.href = img;
        a.style.display = "";
        btn.style.display = "none";
        (callback && typeof(callback) === "function") && callback();
        openList.push(img);

        if (typeof t!=='undefined') {
            clearInterval(t);
        }
        if (typeof t1!=='undefined') {
            clearInterval(t1);
        }
        t = setInterval(function(){
            openNewBackgroundTab(openList.shift());
            clearInterval(t);
            if (openList.length!=0) {
                t1 = setInterval(function(){
                    openNewBackgroundTab(openList.shift());
                    if (openList.length==0) {
                        clearInterval(t1);
                    }
                },500);
            }
        },2000);
    });
}

function openNewBackgroundTab(url){
    var a = document.createElement("a");
    a.href = url; 
    var evt = document.createEvent("MouseEvents");
    //the tenth parameter of initMouseEvent sets ctrl key
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
                       true, false, false, false, 0, null);
                       a.dispatchEvent(evt);
}
