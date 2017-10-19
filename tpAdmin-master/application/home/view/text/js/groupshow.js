
 // 团队展示 讲师
 // 移入
$(".cen").mouseover(function() {
	$(this).stop(true).animate({
	    "width":"471px",
	    "height":"225px"
}, 300);
	$(this).siblings().stop(true).animate({
	    "width": "150px",
	    "height": "265px"
	}, 300)
	$("h3").stop(true).animate({
	    "left": "-30px"
		}, 300)
	});
// 移出
$(".cen").mouseout(function() {
	$(this).stop(true).animate({
		"width": "241px",
		"height": "265px"
	}, 300);

	$(this).siblings().stop(true).animate({
	    "width": "241px",
	    "height": "265px"  
		}, 300);
	$("h3").stop(true).animate({
	    "left": "0"
		}, 300)
	});