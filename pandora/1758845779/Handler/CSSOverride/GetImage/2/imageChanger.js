(function () {
    $(document).ready(function () {

        var aditional_text = $(".aditional_text").text().trim();

        if(aditional_text === "image-changer") {

            $(".flex-control-nav").hide(); //Hide dots

            $(".Stock select").change(function () {

            var newSelection = $(this).find(":selected").text();
            var correctIndex;
            console.log(newSelection);

            $(".Stock option").each(function (index) {
                var text = $(this).text();
                console.log(index);
                console.log($(this).text().trim());

                if (newSelection == text) {
                    console.log("it'sme");
                    correctIndex = index;
                }
            });

                $(".DT_picture").flexslider(correctIndex);

        });
        }
    });

})();