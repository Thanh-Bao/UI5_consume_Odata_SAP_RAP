sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/m/MessageToast',
    "sap/m/MessageBox",
],
    function (Controller, JSONModel, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("baobaostore.com.controller.ZC_PHONE_PRICE_Create", {

            onInit: function () {
                let oNewPhone = new JSONModel({
                    id: "fdf4534",
                    specification_id: 2323,
                    color: "fddfd543534",
                    storage: 432,
                    guarantee: 323,
                    depreciation: 3232,
                    fake_price: 3232323,
                    real_price: 32323232332,
                    status: "dffdf"
                });
                this.getView().setModel(oNewPhone, "new_phone");
            },

            submitNewPhone: function () {

                const _newPhone = {

                    id: "fdf",
                    specification_id: 2323,
                    color: "fddfd",
                    storage: 432,
                    guarantee: 2,
                    depreciation: 2,
                    fake_price: 3232323,
                    real_price: 53434,
                    status: "dffdf"

                };

                this.getView().getModel().create("/ZC_PHONE_PRICE", _newPhone, {
                    success: function () {
                        MessageToast.show("Create successful");
                    },
                    error: function (err) {
                        MessageBox.error(JSON.parse(err.responseText).error.message.value)
                    }
                });

            }
        });
    });