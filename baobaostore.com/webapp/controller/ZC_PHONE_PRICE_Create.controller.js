sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("baobaostore.com.controller.ZC_PHONE_PRICE_Create", {

            onInit: function () {
                let oNewPhone = new JSONModel({
                    id: "fdf",
                    specification_id: 2323,
                    color: "fddfd",
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
                console.log(this.getView().getModel("new_phone"))
                this.getView().getModel().create("/ZC_PHONE_PRICE", {

                    id: "fdf",
                    specification_id: 2323,
                    color: "fddfd",
                    storage: 432,
                    guarantee: 2,
                    depreciation: 2,
                    fake_price: 3232323,
                    real_price: 53434,
                    status: "dffdf"

                })
            }
        });
    });