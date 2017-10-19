$(function() {
	
	// 从子页返回时候打开对应页面
	var url = location.href;
	if(url.indexOf("?") != -1){
		var tmp1 = url.split("?")[1];
		var tmp2 = tmp1.split("&")[0];
		var selectPage = tmp2.split("=")[1];
		$(".section").removeClass("active");
		$(".section").eq(selectPage).addClass("active");
		$("#nav li").removeClass("active");
		$("#nav li").eq(selectPage).addClass("active");
	}		

	// 声明变量
	var company_scroll = document.getElementById("company-con-show");	    // 集团介绍页滚动视窗
	var maxdis = company_scroll.scrollWidth - company_scroll.clientWidth;   // 可滚动的临界值
	var bp_index = 0; 														// 第一屏 大图滚动索引值
	var dis = parseInt(document.getElementById("home_pic").clientWidth);    // 首页视窗自身宽度
	var scrolldis = document.getElementById("home_pic").scrollLeft;         // 滚动距离
	var index = 0;  														// 第四屏 滚动条索引值
	var bigpic_timer = null;  												// 计时器


	// 页面布局：全屏滚动功能
	$("#fullpage").fullpage({
		// 是否内容垂直居中
		verticalCentered: true,
		// 与导航链接对应
		menu: "#nav",
		anchors: ['home', 'company', 'distri', 'news', 'product', 'group', 'contact'],
		// 右侧圆点，导航倒对应页面
		navigation: true,
		'navigationPosition': 'right',
	})

	// 动态生成右侧圆点中鼠标图片
	var mousePic = document.createElement("img"); // 动态生成img
	mousePic.setAttribute("src", "images/index-mouse.png"); // 设置img图片地址
	var newNode = document.createElement("li"); // 动态生成li
	newNode.setAttribute("class", "mousepic"); //设置li类名
	newNode.appendChild(mousePic); // img插入li
	var rightcircle = document.getElementById("fp-nav").getElementsByTagName("ul"); // 圆点父级ul标签
	rightcircle[0].appendChild(newNode); // li插入ul

	// 第一屏
	// 大图滚动
	function bigpic_scroll() {
		if(bp_index >= $("#bigimgs img").length -1 ) {
			bp_index = 0;
			$(".tit-bigpic li").removeClass("active-bigpic");
			$(".tit-bigpic li").eq(bp_index).addClass("active-bigpic");
			$("#home_pic").animate({
				"scrollLeft": 0
			})
			return;
			}
		$(".tit-bigpic li").removeClass("active-bigpic");
		$(".tit-bigpic li").eq(bp_index + 1).addClass("active-bigpic");
		$("#home_pic").animate({
			"scrollLeft": $("#home_pic").scrollLeft() + dis
		})
		bp_index++;
	}
	bigpic_timer = setInterval(bigpic_scroll,3000);

	// 点击底部横条样式更改
	$(".tit-bigpic li").on("click",function() {
		if(bigpic_timer) {
			clearInterval(bigpic_timer);
		}
		var _this = this;
		$(this).siblings().removeClass("active-bigpic");
		$(this).addClass("active-bigpic");
        // 对应大图fadeIn
		$("#home_pic").stop(true).animate({
			"scrollLeft": $(_this).index() * dis
		},function() {
				bp_index =   $(_this).index();
				bigpic_timer = setInterval(bigpic_scroll,3000);
		})
	})

	// 第二屏
	// 点击查看更多内容： 向右
		$(".next").on("click", function() {
			console.log(maxdis)
		if($(".company-con-show").scrollLeft() >= maxdis) {
			$(".company-con-show").animate({
					"scrollLeft": 0
				}, 300);
			return;
		}
		$(".company-con-show").animate({
			"scrollLeft": $(".company-con-show").scrollLeft() + 144
		})
	})
	//  点击查看更多内容：向左
	$(".prev").on("click", function() {
		 if($(".company-con-show").scrollLeft() == 0) {
		 	$(".company-con-show").animate({
		 		"scrollLeft": maxdis
		 	})
		 	return;
		 }
		 $(".company-con-show").animate({
			"scrollLeft": $(".company-con-show").scrollLeft() - 144
		 })
	})
	
	// 第三屏
	// 地图
	Highcharts.setOptions({
		lang: {
			drillUpText: '< 返回 “{series.name}”'
		}
	});
	var map = null,
		geochina = 'https://data.jianshukeji.com/jsonp?filename=geochina/',
		unDrilldown = ['taiwan', 'xianggang', 'aomen'];
	// 获取中国地图数据并初始化图表
	$.getJSON(geochina + 'china.json&callback=?', function(mapdata) {
		var data = [];
		// 随机数据
		Highcharts.each(mapdata.features, function(md, index) {
			data.push({
				name: md.properties.name,
				drilldown: md.properties.filename,
				value: Math.floor((Math.random() * 100) + 1) // 生成 1 ~ 100 随机值
			});
		});
		map = new Highcharts.Map('container', {
			chart: {
				events: {
					drilldown: function(e) {
						// 异步下钻
						if(e.point.drilldown && unDrilldown.indexOf(e.point.drilldown) === -1) {
							var pointName = e.point.properties.fullname;
							map.showLoading('下钻中，请稍后...');
							// 获取二级行政地区数据并更新图表
							$.getJSON(geochina + e.point.drilldown + '.json&callback=?', function(data) {
								data = Highcharts.geojson(data);
								Highcharts.each(data, function(d) {
									d.value = Math.floor((Math.random() * 100) + 1); // 生成 1 ~ 100 随机值
								});
								map.hideLoading();
								map.addSeriesAsDrilldown(e.point, {
									name: e.point.name,
									data: data,
									dataLabels: {
										enabled: true,
										format: '{point.name}'
									}
								});
								map.setTitle({
									text: pointName
								});
							});
						}
					},
					drillup: function() {
						map.setTitle({
							text: '中国'
						});
					}
				}
			},
			title: {
				text: '中国地图'
			},
			subtitle: {
				text: '<a href="https://www.hcharts.cn/mapdata">点击查看地图数据及详情</a>'
			},
			mapNavigation: {
				enabled: true,
				buttonOptions: {
					verticalAlign: 'bottom'
				}
			},
			tooltip: {
				useHTML: true,
				headerFormat: '<table><tr><td>{point.name}</td></tr>',
				pointFormat: '<tr><td>全称</td><td>{point.properties.fullname}</td></tr>' +
					'<tr><td>行政编号</td><td>{point.properties.areacode}</td></tr>' +
					'<tr><td>父级</td><td>{point.properties.parent}</td></tr>' +
					'<tr><td>经纬度</td><td>{point.properties.longitude},{point.properties.latitude}</td></tr>',
				footerFormat: '</table>'
			},
			colorAxis: {
				min: 0,
				minColor: '#fff',
				maxColor: '#006cee',
				labels: {
					style: {
						"color": "red",
						"fontWeight": "bold"
					}
				}
			},
			series: [{
				data: data,
				mapData: mapdata,
				joinBy: 'name',
				name: '中国地图',
				states: {
					hover: {
						color: '#a4edba'
					}
				}
			}]
		});
	});

	// 战略分布：点击列表项弹出表单
	$(".distri-tit li").on("click", function() {
		// 当前列表项样式变更
		$(this).siblings().removeClass("distri-tit-select")
		$(this).siblings().children().removeClass("distri-tit-circle")
		$(this).addClass("distri-tit-select")
		$(this).children().addClass("distri-tit-circle")
	})
	
	// 第四屏
	// 主体内容标题滚动
	function titScroll() {
		$(".news-scroll-wrap").animate({
			"scrollLeft": $(".news-scroll-wrap").scrollLeft() + 3
		},"fast",function() {
			if( $(".news-scroll-wrap").scrollLeft() >= $(".news-scroll-wrap ul").width()-$(".news-scroll-wrap ul li").width()) {
				$(".news-scroll-wrap").scrollLeft(0);
			}
			titScroll();
		})
	}titScroll();
	//	鼠标悬停停止滚动
	$(".news-scroll-wrap").mouseover(function() {
		$(".news-scroll-wrap").stop(true);
	})
	$(".news-scroll-wrap").mouseout(function() {
		titScroll();
	})
    // 大图渐变
	function picFade(ele,index) {
		if(index >= ele.children("img").length) {
			index = 0;
		}
		//	大图下方文字内容变化
		ele.children("img").eq(index).next().fadeIn(2000,function(){
			$(this).fadeOut(2000) 
		});
		// 对应小图边框颜色更改
		$(".news-con-smallpic img").removeClass("news-con-selectpic");
		$(".news-con-smallpic img").eq(index).addClass("news-con-selectpic");
		ele.children("img").eq(index).fadeIn(2000,function() {
			$(this).fadeOut(2000,function() {
				index++;
				picFade($(".news-con-bigpic"),index);
			})
		})
	}picFade($(".news-con-bigpic"),index);

	// 点击小图border样式更改
	$(".news-con-smallpic img").on("click",function() {
		var _this = this;
		$(this).siblings().removeClass("news-con-selectpic");
		$(this).addClass("news-con-selectpic");
	// 对应大图fadeIn
		$(".news-con-bigpic img").stop(true);
			$(".news-con-bigpic img").css({
				"display": "none"
			});
		$(".news-con-bigpic img").eq($(this).index()).fadeIn(2000,function() {
			$(".news-con-bigpic img").eq($(_this).index()).fadeOut(2000,function() {
				index = $(_this).index() + 1;
				picFade($(".news-con-bigpic"),index);
			})
		})
	})

	// 第五屏
	
	// 第六屏
	$(".groop-wrap a").on("mouseenter",function() {
		$(this).animate({
			"opacity": 0
		},function(){
			$(this).css({
				"background-color": "#81cda2"
			})
			$(this).animate({
				"opacity": 1
			},"fast")
		})
		$(this).children("img").eq(0).stop(true,true).animate({
				"left": "-430px"
		});
		$(this).children("img").eq(1).stop(true,true).animate({
				"right":"0"
		});
		$(this).children().css({
				"color": "#FFF"
		})
		$(this).children("em").css({
				"background": "#FFF"
		})
		$(this).children("em").stop(true,true).animate({
					"width": "72px"
		})
	})
	$(".groop-wrap a").on("mouseleave",function() {
		$(this).children("img").eq(1).stop(true,true).animate({
				"right":"-430px"
		});
		$(this).children("img").eq(0).stop(true,true).animate({
			"left":0
		});
		$(this).stop(true,true).animate({
			"opacity": 0
		},"fast");
			$(this).css({
				"background-color": "#FFF",
			})
			$(this).children("strong").css({
				"color": "#F39800"
			})
			$(this).children("span").css({
				"color": "#666"
			})
			$(this).children("em").css({
				"background": "#81cda2"
			})
			$(this).stop(true,true).animate({
				"opacity": 1
			},"fast");
			$(this).children("em").stop(true,true).animate({
				"width": "33px"
			})
	})

	// 第七屏
	// 点击 微信/微网切换对应二维码
		$(".wechat, .friendcircle").mouseenter(function() {
			$(this).children().eq(1).fadeIn()
		})
		$(".wechat, .friendcircle").mouseleave(function() {
			$(this).children().eq(1).fadeOut()
		})

	// 地图
	var map = new BMap.Map("allmap"); // 创建Map实例
	map.centerAndZoom(new BMap.Point(118.1678530000, 24.5353150000), 11); // 初始化地图,设置中心点坐标和地图级别
	map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
	map.setCurrentCity("厦门"); // 设置地图显示的城市 此项是必须设置的
//	map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
})