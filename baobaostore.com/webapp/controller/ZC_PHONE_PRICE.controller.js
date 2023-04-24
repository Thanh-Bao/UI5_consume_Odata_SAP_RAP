sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/odata/ODataModel",
],

    function (Controller, formatter, JSONModel, Filter, ODataModel) {
        "use strict";

        return Controller.extend("baobaostore.com.controller.ZC_PHONE_PRICE", {
            formatter: formatter,
            _filters_condition: {
                all_product: [],
                new_product: [new Filter("depreciation", "EQ", 0)],
                used_product: [new Filter("depreciation", "GT", 0)],
                in_stock: [new Filter("status", "EQ", "IN_STOCK")]
            },

            onInit: function () {
                // Model used to manipulate control states
                let oViewModel = new JSONModel({
                    all_product: 0,
                    new_product: 0,
                    used_product: 0,
                    in_stock: 0
                });
                this.getView().setModel(oViewModel, "list_IPhone_model_key_name");

                ///////////////////////////////////////////////////

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
            onUpdateFinished: function () {
                let oModel = this.getView().getModel('list_IPhone_model_key_name');
                for (const property in this._filters_condition) {
                    this.getView().getModel().read('/ZC_PHONE_PRICE/$count', {
                        filters: this._filters_condition[property],
                        success: function (count) {
                            oModel.setProperty(`/${property}`, count);
                        }
                    })
                }
            },
            onQuickFilter: function (oEvent) {
                var sKey = oEvent.getParameter("key"),
                    oFilter = this._filters_condition[sKey],
                    oTable = this.byId("Iphone_table"),
                    oBinding = oTable.getBinding("items");
                if (oFilter) {
                    oBinding.filter(oFilter);
                } else {
                    oBinding.filter([]);
                }
            },

            onAddNewPhonePressBtn: function (oEvent) {
                // this.getOwnerComponent().getRouter().navTo("add_phone_page");
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("ZC_PHONE_PRICE_Create");
            },
            submit: function () {
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
