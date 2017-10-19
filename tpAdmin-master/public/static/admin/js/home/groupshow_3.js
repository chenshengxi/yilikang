  // 第一个ul
    // 第一个li移入
    $(".first-a").mouseover(function() {
	    $(".first-a").children(".management-f").stop(true).animate({"width":"488px"}).siblings(".management-t").stop(true).animate({"width":"234px"}).parent().children(".management-f").children("h3").stop(true).animate({"left":"130px","opacity":"0"})

    	    $(".first-b").stop(true).animate({"left":"498px"}).children(".management-f").stop(true).animate({"width":"180px"})
    	    $(".first-c").stop(true).animate({"left":"688px"}).children(".management-f").stop(true).animate({"width":"180px"})
    	    $(".first-d").stop(true).animate({"left":"878px"}).children(".management-f").stop(true).animate({"width":"180px"})
    })
    // 第二个li移入
     $(".first-b").mouseover(function() {
	    $(".first-b").children(".management-f").stop(true).animate({"width":"488px"}).siblings(".management-t").stop(true).animate({"width":"234px"}).parent().stop(true).animate({"left":"190px"}).children(".management-f").children("h3").stop(true).animate({"left":"130px","opacity":"0"})
    	    $(".first-a").stop(true).animate({"left":"0"}).children(".management-f").stop(true).animate({"width":"180px"})
    	    $(".first-c").stop(true).animate({"left":"688px"}).children(".management-f").stop(true).animate({"width":"180px"})
    	    $(".first-d").stop(true).animate({"left":"878px"}).children(".management-f").stop(true).animate({"width":"180px"})
    })
     //第三个li移入
     $(".first-c").mouseover(function() {
	    $(".first-c").children(".management-f").stop(true).animate({"width":"488px"}).siblings(".management-t").stop(true).animate({"width":"234px"}).parent().stop(true).animate({"left":"380px"}).children(".management-f").children("h3").stop(true).animate({"left":"130px","opacity":"0"})
    	    $(".first-a").stop(true).animate({"left":"0"}).children(".management-f").stop(true).animate({"width":"180px"})
    	    $(".first-b").stop(true).animate({"left":"190px"}).children(".management-f").stop(true).animate({"width":"180px"})
    	    $(".first-d").stop(true).animate({"left":"878px"}).children(".management-f").stop(true).animate({"width":"180px"})
    })
     //第四个li移入
     $(".first-d").mouseover(function() {
	    $(".first-d").children(".management-f").stop(true).animate({"width":"488px"}).siblings(".management-t").stop(true).animate({"width":"234px"}).parent().stop(true).animate({"left":"570px"}).children(".management-f").children("h3").stop(true).animate({"left":"130px","opacity":"0"})
    	    $(".first-a").stop(true).animate({"left":"0"}).children(".management-f").stop(true).animate({"width":"180px"})
    	    $(".first-b").stop(true).animate({"left":"190px"}).children(".management-f").stop(true).animate({"width":"180px"})
    	    $(".first-c").stop(true).animate({"left":"380px"}).children(".management-f").stop(true).animate({"width":"180px"})
    })
     // 第二个ul
      // 第一个li移入
    $(".first-e").mouseover(function() {
	    $(".first-e").children(".management-f").stop(true).animate({"width":"488px"}).siblings(".management-t").stop(true).animate({"width":"234px"}).parent().children(".management-f").children("h3").stop(true).animate({"left":"130px","opacity":"0"})

    	    $(".first-f").stop(true).animate({"left":"498px"}).children(".management-f").stop(true).animate({"width":"180px"})
    	    $(".first-g").stop(true).animate({"left":"688px"}).children(".management-f").stop(true).animate({"width":"180px"})
    	    $(".first-h").stop(true).animate({"left":"878px"}).children(".management-f").stop(true).animate({"width":"180px"})
    })
    // 第二个li移入
     $(".first-f").mouseover(function() {
	    $(".first-f").children(".management-f").stop(true).animate({"width":"488px"}).siblings(".management-t").stop(true).animate({"width":"234px"}).parent().stop(true).animate({"left":"190px"}).children(".management-f").children("h3").stop(true).animate({"left":"130px","opacity":"0"})
    	    $(".first-e").stop(true).animate({"left":"0"}).children(".management-f").stop(true).animate({"width":"180px"})
    	    $(".first-g").stop(true).animate({"left":"688px"}).children(".management-f").stop(true).animate({"width":"180px"})
    	    $(".first-h").stop(true).animate({"left":"878px"}).children(".management-f").stop(true).animate({"width":"180px"})
    })
     //第三个li移入
     $(".first-g").mouseover(function() {
	    $(".first-g").children(".management-f").stop(true).animate({"width":"488px"}).siblings(".management-t").stop(true).animate({"width":"234px"}).parent().stop(true).animate({"left":"380px"}).children(".management-f").children("h3").stop(true).animate({"left":"130px","opacity":"0"})
    	    $(".first-e").stop(true).animate({"left":"0"}).children(".management-f").stop(true).animate({"width":"180px"})
    	    $(".first-f").stop(true).animate({"left":"190px"}).children(".management-f").stop(true).animate({"width":"180px"})
    	    $(".first-h").stop(true).animate({"left":"878px"}).children(".management-f").stop(true).animate({"width":"180px"})
    })
     $("li").mouseout(function() {
	    $("li").children(".management-f").stop(true).animate({"width":"254px"}).siblings(".management-t").stop(true).animate({"width":"0"}).parent().children(".management-f").children("h3").stop(true).animate({"left":"80px","opacity":"1"})
    	    $(".first-b").stop(true).animate({"left":"264px"}).children(".management-f").stop(true).animate({"width":"254px"},100)
    	    $(".first-c").stop(true).animate({"left":"528px"}).children(".management-f").stop(true).animate({"width":"254px"},100)
    	    $(".first-d").stop(true).animate({"left":"792px"}).children(".management-f").stop(true).animate({"width":"254px"},100)
    	    $(".first-f").stop(true).animate({"left":"264px"}).children(".management-f").stop(true).animate({"width":"254px"},100)
    	    $(".first-g").stop(true).animate({"left":"528px"}).children(".management-f").stop(true).animate({"width":"254px"},100)
    	    $(".first-h").stop(true).animate({"left":"792px"}).children(".management-f").stop(true).animate({"width":"254px"},100)
    })