var DownloadableProductsHelper = function () {
    var that = this;

    this.downloadUrl = '';
    this.downloadTitle = 'vue.downloadnotification.title';
    this.maxConcurrencyDownloads = 1;

    var selectors = {
        downloadCheckbox: '.downloadCheckbox',
        downloadButton: '.download-btn',
    }

    this.setSelectors = function (selects) {
        selectors = selects;
    }

    var immediateAction;

    var attachCheckboxEvent = function () {
        $(selectors.downloadCheckbox).change(function () {
            if ($(selectors.downloadCheckbox + ":checked").length > 0) {
                $(selectors.downloadButton).show();
            } else {
                $(selectors.downloadButton).hide();
            }
        });
    }

    var attachDownloadButtonEvent = function () {
        $(selectors.downloadButton).click(function () {
            var $selected = $(selectors.downloadCheckbox + ":checked");
            var opvIds = [];
            var orderIds = [];
            for (var i = 0; i < $selected.length; i++) {
                var $el = $($selected[i]);
                opvIds.push(+$el.attr('data-opv-id'));
                orderIds.push(+$el.attr('data-order-id'));
            }

            var payload = {
                OpvIds: opvIds
            };
            $.ajax({
                url: that.downloadUrl,
                method: 'post', // post
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(payload),
                success: function (response) {
                    if (response.Success) {
                        enqueue(response.QueueId, orderIds);
                    } else {
                        cfVue.toast.open({
                            duration: 5000,
                            message: response.ErrorMessage,
                            position: 'is-bottom',
                            type: 'is-danger',
                        });
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert('Failed to trigger queue item')
                }
            });

            //disable button for a short period
            $(this).prop('disabled', true);
            changeDownloadButtonDisabled(true);
        });
    }
    
    this.enqueue = function(id, additionalIds){
        enqueue(id, additionalIds);
    }

    var changeDownloadButtonDisabled = function (disabled) {
        $(selectors.downloadButton).prop('disabled', disabled);
    }
    
    this.changeDownloadButtonDisabled = changeDownloadButtonDisabled;

    var attachEvents = function () {
        attachCheckboxEvent();
        // attachDownloadButtonEvent();
    }

    var onClose = function(){
        changeDownloadButtonDisabled(false);
    }
    
    var onStatusChanged = function (entry) {
        var queueItems = immediateAction.queueItems;

        var nonFinished = 0;

        for (var i = 0; i < queueItems.length; i++) {
            var item = queueItems[i];
            if (item.status !== 30 && item.status !== 40) {
                nonFinished++;
            }
        }

        if (nonFinished >= that.maxConcurrencyDownloads) {
            changeDownloadButtonDisabled(true);
        } else {
            setTimeout(() => {
                changeDownloadButtonDisabled(false);
            }, 1000);
        }
    }

    var enqueue = function (queueId, orderIds) {
        if (!immediateAction || immediateAction.isDestroyed) {
            immediateAction = cfVue.immediateAction.open({
                position: 'is-bottom-right',
                title: that.downloadTitle,
                onStatusChanged: onStatusChanged,
                onClose: onClose
            });
        }

        var message = null;
        if (orderIds){
            message = prepareAdditionalMessage(orderIds);
        }

        immediateAction.insert(queueId, message);

        window.immediateActionData = immediateAction;
    }

    var prepareAdditionalMessage = function (orderIds) {
        var unique = uniqueArray(orderIds);
        var data = take(unique, 3);
        if (unique.length > 3) {
            return data.join(', ') + '...';
        }
        return unique.join(', ');
    }

    function take(arr, n) {
        return arr.slice(0, Math.min(arr.length, n));
    }

    var uniqueArray = function (arrArg) {
        return arrArg.filter(function (elem, pos, arr) {
            return arr.indexOf(elem) == pos;
        });
    };

    this.init = function (downloadUrl) {
        that.downloadUrl = downloadUrl;
        attachEvents();
    }

    this.setDialogTitle = function (text) {
        that.downloadTitle = text;
    }
}

