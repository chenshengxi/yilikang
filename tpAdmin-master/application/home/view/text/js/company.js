$(document).ready(function() {
// 集团介绍Tab切换
    $(".tits").on("click", function() {
        $(this).css({
            "marginTop": "20px",
            "height": "46px",
            "backgroundColor": "#fff",
            "color": "#f90",
            "font-weight": "bold"
        }).addClass("active").siblings(".tits").css({
            "marginTop": "26px",
            "height": "40px",
            "backgroundColor": "#e3f4eb",
            "color": "#4dad71",
            "font-weight": "normal"
        }).removeClass("active").parent().siblings().children().eq($(this).index()).css({"display": "block"}).siblings().css({"display": "none"});
    });
    $(".tits").mouseover(function() {
        $(this).stop(true, true).animate({
            "marginTop": "20px",
            "height": "46px",      
        }).css({"backgroundColor": "#fff"});
    });
    $(".tits").mouseout(function() {
        if($(this).hasClass('active')) {
            return;
        } else {
            $(this).stop(true, true).animate({
                "marginTop": "26px",
                "height": "40px",      
            }).css({"backgroundColor": "#e3f4eb"});   
        }
    });

    // 第二页大图预览
    $(".pic_page2").mouseover(function() {
        $(this).children("span").stop().animate({
            "top": "0"
        }, 500);
        $(this).children("em").stop().animate({
            "bottom": "38%"
        }, 500);
    });
    $(".pic_page2").mouseout(function() {
        $(this).children("span").stop().animate({
            "top": "100%"
        }, 500);
        $(this).children("em").stop().animate({
            "bottom": "100%"
        }, 500);
    });
        // 蒙版
    $(".pic_page2").on("click", function() {
        $(".masking").stop().animate({"right": "0"}).children("img").eq($(".pic_page2").index(this)).css({"display": "block"});
    });
    $(".masking span").on("click", function() {
        $(".masking").stop().animate({"right": "100%"});
    });
})

// 第五页
$(".left_page5_con").on("click", function() {
    var maxLength = certificate();
    if($(".certificate").scrollLeft() <= 0) {
        $(".certificate").stop().animate({
            "scrollLeft": maxLength
        });
        return;
    }
    $(".certificate").stop().animate({
        "scrollLeft": $(".certificate").scrollLeft() - 484
    });
});
$(".right_page5_con").on("click", function() {
    var maxLength = certificate();
    if($(".certificate").scrollLeft() >= maxLength) {
        $(".certificate").stop().animate({
            "scrollLeft": 0
        });
        return;
    }
    $(".certificate").stop().animate({
        "scrollLeft": $(".certificate").scrollLeft() + 484
    });
});
function certificate() {
    var certificate = document.getElementById("certificate");
    var maxLength =  certificate.scrollWidth - certificate.clientWidth;
    return maxLength;
}

// 第六页 成绩查询页
    // 生成页
$(".query").on("click", function() {
    $(".query_page").css({"display": "block"});
});
    // 点击退出页
$(".query_page_head span").on("click", function() {
    $(".query_page").css({"display": "none"});
});
    // 滚动条移入显示，移出隐藏
$(".query_page_main").mouseover(function() {
    $(".scrollbox").css({"display": "block"});
});
$(".query_page_main").mouseout(function() {
    $(".scrollbox").css({"display": "none"});
});
    // 自定义滚动条
var box = document.getElementById("scrollbox");
var scrollBar = document.getElementById("scrollbar");
var main = document.getElementById("con_query_page");
var con = document.getElementById("conbox");
// 阻止默认样式
function prevent(evt) {
    if(evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
}
//纵向滚动条
    //鼠标按下事件
scrollBar.onmousedown = function(e) {
    var evt = e || window.event;
    var startY = evt.clientY;
    var initialPositionY = scrollBar.offsetTop;
    //阻止默认样式
    prevent(evt);
    //鼠标按下事件发生时，鼠标移动事件触发
    document.onmousemove = function(e) {
        //鼠标坐标获取
        var evt = e || window.event;
        var nowY = evt.clientY;
        var lengY = nowY - startY;
        var endY = initialPositionY + lengY;
    // 临界值判断
        // 纵向滚动条临界值判断
        if(endY <= 0) {
            endY = 0;
        }
        if(endY >= box.clientHeight - scrollBar.offsetHeight) {
            endY = box.clientHeight - scrollBar.offsetHeight;
        }
        //与左侧内容区关联实现滚动条移动内容移动
        var scale = endY / (box.clientHeight - scrollBar.offsetHeight);
        //【main.scrollHeight = con.clientHeight】
        main.scrollTop = scale * (con.clientHeight - main.clientHeight)
        prevent(evt);
        scrollBar.style.top = endY + "px";
        console.log(main.scrollTop);
    }
}
//鼠标抬起时事件，鼠标移动事件清除，停止移动
document.onmouseup = function() {
    document.onmousemove = null;
}