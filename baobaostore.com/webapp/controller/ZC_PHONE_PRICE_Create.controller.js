sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/m/MessageToast',
    "sap/m/MessageBox",
    'sap/ui/core/BusyIndicator',
    "sap/ui/model/Filter",
],
    function (Controller, JSONModel, MessageToast, MessageBox, BusyIndicator, Filter) {
        "use strict";

        return Controller.extend("baobaostore.com.controller.ZC_PHONE_PRICE_Create", {

            onInit: function () {
                let oNewPhone = new JSONModel({
                    value: {
                        id: {
                            value: null,
                            valueState: null,
                            valueStateText: null
                        },
                        specification_id: {
                            value: null,
                            valueState: null,
                            valueStateText: null
                        },
                        color: {
                            value: null,
                            valueState: null,
                            valueStateText: null
                        },
                        storage: {
                            value: null,
                            valueState: null,
                            valueStateText: null
                        },
                        guarantee: {
                            value: null,
                            valueState: null,
                            valueStateText: null
                        },
                        depreciation: {
                            value: null,
                            valueState: null,
                            valueStateText: null
                        },
                        fake_price: {
                            value: null,
                            valueState: null,
                            valueStateText: null
                        },
                        real_price: {
                            value: null,
                            valueState: null,
                            valueStateText: null
                        },
                        status: {
                            value: null,
                            valueState: null,
                            valueStateText: null
                        }
                    }

                })
                this.getView().setModel(oNewPhone, "new_phone");


            },

            checkPhoneId: function (e) {
                const _phoneId = e.getParameters().value;
                let _oModel = this.getView().getModel('new_phone');
                _oModel.setProperty("/value/id/valueState", null);

                if (_phoneId) {
                    this.getView().getModel().read('/ZC_PHONE_PRICE/$count', {
                        filters: [new Filter("id", "EQ", _phoneId)],
                        success: function (count) {
                            if (count > 0) {
                                _oModel.setProperty("/value/id/valueState", "Error");
                                _oModel.setProperty("/value/id/valueStateText", "phone ID already exists!");
                            } else {
                                _oModel.setProperty("/value/id/valueState", "Success");
                            }
                        },
                        error: function (err) {
                            console.log("/ZC_PHONE_PRICE/$count=>", err)
                            alert("/ZC_PHONE_PRICE/$count ERROR!!!")
                        }
                    })
                } else {
                    _oModel.setProperty("/value/id/valueState", null);
                    _oModel.setProperty("/value/id/valueStateText", null);
                }

            },

            submitNewPhone: function () {
                BusyIndicator.show(0);
                const _newPhoneFromView = this.getView().getModel('new_phone').getProperty("/value");

                const _newPhonePayloadOdata = {};

                for (const property in _newPhoneFromView) {
                    _newPhonePayloadOdata[property] = _newPhoneFromView[property].value;
                }

                console.log("XXXX", _newPhonePayloadOdata)

                this.getView().getModel().create("/ZC_PHONE_PRICE", _newPhonePayloadOdata, {
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