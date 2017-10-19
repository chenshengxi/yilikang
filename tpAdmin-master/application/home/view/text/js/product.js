$(".head_product span").click(function() {
    $(this).addClass('active_product').siblings().removeClass("active_product");
    var index = $(this).index();
    console.log(index)
    $.getJSON("../json/product.json", function(obj) {
        console.log(obj.pic[index])
        $("#img_item").attr({src : obj.pic[index]});
        $("#title_item").html(obj.caption[index]);
        $("#para").html(obj.para[index]);
    })
})
   
