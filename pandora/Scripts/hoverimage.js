function HoverOver(obj) {
    $(".thumb a").removeClass("active--thumb");
    $(obj).addClass("active--thumb");
    $(".bigpicture").children("img").attr("src", $(obj).attr("href"));
}