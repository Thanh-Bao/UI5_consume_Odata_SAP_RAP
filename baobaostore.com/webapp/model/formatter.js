sap.ui.define([], function () {
    "use strict";

    return {
        product_status: function (status_code) {
            let status_label = "";
            switch (status_code) {
                case 'IN_STOCK':
                    status_label = 'In stock';
                    break;

                case 'STOCK_OUT':
                    status_label = 'Stock out';
                    break;
            }
            return status_label;
        },
        price: function (price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
    };
});
