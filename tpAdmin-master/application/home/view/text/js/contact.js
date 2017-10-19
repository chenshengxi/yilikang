
$(".li-centre").on("click", function() {
	$(this).toggleClass("show").children(".li-first").children("em").toggleClass("minsa").siblings("h2").toggleClass("msain").parent().parent().siblings().removeClass("show").children(".li-first").children("em").removeClass("minsa").siblings("h2").removeClass("msain")
})
