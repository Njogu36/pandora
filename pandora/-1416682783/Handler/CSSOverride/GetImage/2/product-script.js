function SetQty() {
    var selectValue = $(".Quantity select").val();
    var selectText = $(".Quantity select option[value='" + selectValue + "']").text().trim();
    selectText = selectText * 1;
    console.log(selectText);
    $(".quantityBox").val(selectText);
}
$(document).ready(function () {
    $(".countdown_timer").insertAfter(".price");
    $(".aditional_text").appendTo(".layout--twocolumnProductPage");


    SetQty();


    $(".Quantity select").change(function () {
        SetQty();
    });


    /* =========================================================
     Create a slider from images
     ==========================================================*/
    $(".DT_product-details-page").css("opacity", 1);
    if ($(".DT_picture").length) {
        function createSlider() {
            var parent = $(".DT_picture");
            var images = parent.find("img");

            //Clear contents
            parent.empty();

            var htmlBuilder = ["<ul class='slides'>"];

            $.each($(images), function (index, item) {
                var sliderItem = "<li> " + $(item).css("opacity", 1).prop('outerHTML') + "</li>";

                htmlBuilder.push(sliderItem);
            });

            htmlBuilder.push("</ul>");

            parent.append($(htmlBuilder.join("")));
        }

        createSlider();

        $('.DT_picture').flexslider({
            animation: "fade",
            touch: true,
            slideshow: false
        });

        /* =========================================================
         Image changer based on text selection
         ==========================================================*/

        var aditional_text = $(".shortdescription").text().trim();

        if (aditional_text === "image-changer") {

            $(".flex-control-nav").hide(); //Hide dots

            function changeImageSelect(event) {

                var newSelection = $(event.target).find(":selected").text();
                var correctIndex;

                $(".Stock option").each(function (index) {
                    var text = $(this).text();

                    if (newSelection == text) {
                        correctIndex = index;
                    }
                });

                $(".DT_picture").flexslider(correctIndex);

            }

            function changeImageSelect(event) {

                var newSelection = $(event.target).find(":selected").text();
                var correctIndex;

                $(".Stock option").each(function (index) {
                    var text = $(this).text();

                    if (newSelection == text) {
                        correctIndex = index;
                    }
                });

                $(".DT_picture").flexslider(correctIndex);

            }

            function changeImageRadio(item) {
                var newSelection = $(item).parent().find('input[type=radio]:checked').val();
                var correctIndex;

                $(".Fold_Option input[type=radio]").each(function (index) {
                    var text = $(this).val();

                    if (newSelection == text) {
                        correctIndex = index;
                    }
                });

                $(".DT_picture").flexslider(correctIndex);
            }

            //More can be added by attaching the change image for select or radio
            $(".Stock select").change(changeImageSelect);

            $(".Fold_Option").find("input[type=radio]").change(function () {
                changeImageRadio(this);
            });
        }

    }
    /* =========================================================
     Canvas Size Selection
     ==========================================================*/

    function findCanvasSelector() {
        var rtn;

        $(".dynamicProductOptionTable td").each(function (index, item) {

            var attributeName = $(item).text().trim();
            if (attributeName === "Canvas:") {
                rtn = $(item).next().find("select");
            }
        });

        return rtn;
    }

    function selectCanvasValue(text) {
        var canvasItem = findCanvasSelector();
        var selectText = text.trim();
        console.log(selectText);
        $(canvasItem).find("option").each(function (index, item) {
            var optionItemArray = item.innerHTML.replace(/ /g, '').split("-");

            optionItemArray.forEach(function (it, idx) {
                selectText = selectText.replace(/\s/g, '');
                if (selectText === it) {
                    $(canvasItem).val($(item).val());
                }
            });
        });
    }

    function syncSelect(self) {
        var newSelection = $(self).find(":selected").text();
        console.log("selection text " + newSelection)
        selectCanvasValue(newSelection);
    }

    function attachHandlerToSelect(item) {
        var selectElement = $(item).next();

        syncSelect(selectElement);

        $(selectElement).change(function () {
            syncSelect(this);
        });
    }

    function syncRadio(self) {
        var labelText = $(self).next().text().trim();
        console.log("label text " + labelText)
        selectCanvasValue(labelText);
    }

    function attachHandlerToRadio(item) {
        var optionContainer = $(item).parent();
        var initiallySelectedRadio = optionContainer.find('input[type=radio]:checked');
        syncRadio(initiallySelectedRadio);

        $(optionContainer).find("input[type=radio]").change(function () {
            syncRadio(this);
        });
    }

    function setupSelections() {
        /*
         This loops through the attachMap below to attach to the canvas selector.
         This can be extended to different attributes but adding the string of the label below and the function
         to call, currently radio and select are supported.
         */

        var attachMap = {
            'Size': attachHandlerToSelect,
            'Orientation': attachHandlerToRadio,
            'Type': attachHandlerToRadio
        };

        //This loops check if there is a canvas attribute set on the product
        $(".dynamicProductOptionTable td").each(function (index, item) {

            //Check if the attribute is called Canvas
            var attributeName = $(item).text().trim();
            if (attributeName === "Canvas:") {

                //Attach all the event handlers
                $(".attributeHeader").each(function (index, item) {
                    var headerText = $(item).find(".attributeTitle").text();

                    if (headerText in attachMap) {
                        attachMap[headerText](item);
                    }
                });

            }
        });


    }

    setupSelections();


    /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     Change the button text on the product landing page using object
     -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

    function setButtonText() {

        var listWord = {
            'upload': 'Upload your own'
        };

        var productNameArray = $(".productname").text().trim().split(" ");
        var firstWord = productNameArray[0].toLowerCase();

        if (firstWord in listWord) {
            $(".productvariantaddtocartbutton").val(listWord[firstWord]);
        }

    }

    setButtonText();


    function meetThePaperAnchorCreator() {

        if ($(".tabbed-section").length > 0) {

            var buttonContainer = $(".Stock .attributeHeader, .Type .attributeHeader");

            if ($(buttonContainer).length <= 0) {
                buttonContainer = $(".Binding_Type .attributeHeader");
            }

            var button = $('<a id="findoutmore"><span class="if-help-icon"></span>Find out more</a>');


            function scrollToMeetPaperSection() {
                $('html, body').animate({
                    scrollTop: $(".tabbed-section").first().offset().top - 100
                }, 1500);
            }

            $(button).appendTo($(buttonContainer));

            $("#findoutmore").click(scrollToMeetPaperSection);

        }

    }

    meetThePaperAnchorCreator();


});