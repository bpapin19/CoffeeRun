(function (window) {
    'use strict';
    var FORM_SELECTOR = '[payment-handler="form"]';
    var App = window.App || {};
    var $ = window.jQuery;

    class PaymentFormHandler {
        constructor(selector) {
            console.log('Inside PaymentFormHandler');
            if (!selector) { throw new Error('No selector provided'); }

            this.$formElement = $(selector);
            if (this.$formElement.length === 0) {
                throw new Error('Could not find element with selector: ' + selector);
            }
        }
        addSubmitHandler(fn) {
            console.log('Setting submit handler for payment ' + fn);

            this.$formElement.on('paySubmit', function (event) {
                event.preventDefault();

                var data = {};
                $(this).serializeArray().forEach(function (item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });
                console.log(data);
                fn(data);
                this.reset();
                this.elements[0].focus();
            });
        }
    };

    App.PaymentFormHandler = PaymentFormHandler;
    window.App = App;
})(window);