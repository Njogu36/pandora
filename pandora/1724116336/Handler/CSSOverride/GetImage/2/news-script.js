(function () {

    $(document).ready(function () {

        //News
        var newsItems = $(".newsitems").find(".item");

        $.each(newsItems, function (index, item) {

            //Create image and container
            var imageItem = $(item).find(".newsdetails img").first();
            var imageItemHTML = imageItem.prop('outerHTML');
            $(imageItem).remove();

            if(imageItemHTML !== undefined) {
                var htmlString = "<div class='feat__img'>" + imageItemHTML + "</div>";
                $(item).prepend(htmlString);
            }



            //Remove - from news date
            var element = $(item).find(".newsdate");
            var elementText = $(element).html();
            var editedText = elementText.replace("-", "").trim();
            $(element).html(editedText);


            $clamp($(item).find(".newsdetails")[0], {clamp: 3});



            //Fade elements in
            (function (element, delay) {
                setTimeout(function () {
                    $(element).css("opacity", 1);
                }, 150 * delay);

            })(item, index);

        });


        //Blogs
        var blogItems = $(".blogposts").find(".post");

        $.each(blogItems, function (index, item) {
            //Remove - from news date


            var blogBody = $(item).find(".blogdetails");
            var blogLink = $(item).find(".blogimage").attr("href");


            blogBody.after("<a class='link-border' href='" + blogLink + "'>Read More</a>");



            //Fade elements in
            (function (element, delay) {
                setTimeout(function () {
                    $(element).css("opacity", 1);
                }, 200 + (150 * delay));

            })(item, index);

        });


    });

})();