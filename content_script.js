//確認網址
$( document ).ready(function(){
    checkForValidUrl(window.location.href);
});
function checkForValidUrl(url) {
    if(getDomainFromUrl(url).toLowerCase()=="chan.sankakucomplex.com"){
        //添加按鈕
        var newBar = $('<div style="text-align: center"><div class="bar"></div></div>')
        var saveBtn = $('<input type="button" value="GetOriginalLink" style="padding: 0.2em 1em"/>').click(save);
        var saveA = $('<a href="#" style="padding: 0.4em 1em;display:none">DirectUrl</a>');

        $(".content div span").append(newBar);
        $(".bar").append(saveBtn);
        $(".bar").append(saveA);

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

function save() {
    var url = this.parentNode.parentNode.parentNode.children[0].href;
    var btn = this;
    var a = this.parentNode.children[1];
    $.get(url,function(data){
            PageContent = data;
            //將取得結果解析至網頁中
            var img=$(PageContent).find("a#highres")[0].href;
            a.href = img;
            a.style.display = "";
            btn.style.display = "none";
    });
}
