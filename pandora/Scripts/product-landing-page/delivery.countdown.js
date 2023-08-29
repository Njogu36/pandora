var DeliveryCountdown = (function() {
    
    function DeliveryCountdown(minutesUtc, languageCulture, url, pvId) {
        this.global = {
            minutesUtc: minutesUtc,
            languageCulture: languageCulture,
            url: url,
            pvId: pvId
        }
        this.config = {
            deliveryDay: undefined,
            deadlineHour: undefined
        };
    };
    
    DeliveryCountdown.prototype.countdownUpdate = function() {
        var deliveryDay = this.config.deliveryDay;
        var targetHour = this.config.deadlineHour;
        var currTime = moment.utc().utcOffset(this.global.minutesUtc);
        var hours = parseInt(currTime.format('HH'));
        var min = parseInt(currTime.format('mm'));
        var sec = parseInt(currTime.format('ss'));

        var targetMoment = moment.utc().utcOffset(this.global.minutesUtc);
        targetMoment.set({ 'date': parseInt(targetMoment.format('Do')) + Number(deliveryDay) });

        var languageCode = this.global.languageCulture;

        if (typeof languageCode === typeof undefined || languageCode === false) {
            languageCode = $('html').attr('lang').toLowerCase();
        }

        var cday = targetMoment.locale(languageCode).format('ddd');
        var targetMonth = targetMoment.locale(languageCode).format('MMM');
        var targetDay = targetMoment.locale(languageCode).format('Do');

        var offset = 24;

        var hrs, mnt, scs;
        if (hours < targetHour) {
            hrs = (targetHour) - hours - 1;
            mnt = 59 - min;
            scs = 59 - sec;
            if (hrs < 10) {
                hrs = '0' + hrs;
            }
            if (mnt < 10) {
                mnt = '0' + mnt;
            }
            if (scs < 10) {
                scs = '0' + scs;
            }
        } else {
            hrs = (targetHour + offset) - hours - 1;
            mnt = 59 - min;
            scs = 59 - sec;
            if (hrs < 10) {
                hrs = '0' + hrs;
            }
            if (mnt < 10) {
                mnt = '0' + mnt;
            }
            if (scs < 10) {
                scs = '0' + scs;
            }
        }

        $('.countdown_timer .hrs').html(hrs);
        $('.countdown_timer .mnt').html(mnt);
        $('.countdown_timer .scs').html(scs);
        $('.countdown_timer .day_name').html(cday);
        $('.countdown_timer .day_nr').html(targetDay);
        $('.countdown_timer .month').html(targetMonth);
    }
    
    DeliveryCountdown.prototype.countdown = function(self) {
        var quantity = parseInt($(".quantityBox").val());
        var selectedAttributes = $("[data-allAttributes]").val();
        var data2Send = {
            quantity: quantity,
            productVariantId: this.global.pvId,
            selectedAttributesJson: selectedAttributes
        };

        $.ajax({
            url: self.global.url,
            type: 'POST',
            data: data2Send,
            success: function(returnData) {
                self.config = returnData;
            }
        }).done(function() {
            setTimeout(function() {
                    //Get Countdown Configuration each 50 seconds
                    self.countdown(self);
                },
                300000);
        });
    }

    
    DeliveryCountdown.prototype.init = function(){
        var self = this;
        //Consumer
        $(window).load(function () {
            window.setInterval(function () {
                    //Check if countDownConfiguration is not empty(first call), otherwise we have the countdown with NAN when is slow connection
                    if (!jQuery.isEmptyObject(self.config)
                        && self.config.deliveryDay !== undefined
                        && self.config.deadlineHour !== undefined) 
                    {
                        self.countdownUpdate(self.config);
                    }
                },
                1000);
        });


        //Producer
        $(window).load(function() {
            //First call to get data
            // Get selected attributes
            window.updateSelectedAttributes();

            // Get estimation
            self.countdown(self);

            //Get data in case when quantity or attribute combinations are changed
            $(function() {
                $('input, select, textarea').change(function(){self.countdown(self)});
            });

        });
    }
    
    return DeliveryCountdown;
})();
