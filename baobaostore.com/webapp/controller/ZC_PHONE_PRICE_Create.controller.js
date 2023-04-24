sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/m/MessageToast',
    "sap/m/MessageBox",
    'sap/ui/core/BusyIndicator'
],
    function (Controller, JSONModel, MessageToast, MessageBox, BusyIndicator) {
        "use strict";

        return Controller.extend("baobaostore.com.controller.ZC_PHONE_PRICE_Create", {

            onInit: function () {
                let oNewPhone = new JSONModel({
                    hello: {
                        id: "fdf4534",
                        specification_id: 2323,
                        color: "fddfd543534",
                        storage: 432,
                        guarantee: 11,
                        depreciation: 8,
                        fake_price: 3232323,
                        real_price: 32323232,
                        status: "dffdf"
                    }
                })
                this.getView().setModel(oNewPhone, "new_phone");
            },

            submitNewPhone: function () {
                BusyIndicator.show(0);
                const _newPhone = this.getView().getModel('new_phone').getProperty("/hello");

                this.getView().getModel().create("/ZC_PHONE_PRICE", _newPhone, {
                    success: function () {
                        MessageToast.show("Create successful");
                        BusyIndicator.hide();
                    },
                    error: function (err) {
                        MessageBox.error(JSON.parse(err.responseText).error.message.value);
                        BusyIndicator.hide();
                    }
                });

            }
        });
    });