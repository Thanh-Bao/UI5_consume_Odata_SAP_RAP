sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/odata/ODataModel"
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
            }
        });
    });
