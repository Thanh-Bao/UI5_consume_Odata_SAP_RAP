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
                            valueStateText: null,
                            isLoading: false,
                            type: 'Text'
                        },
                        specification_id: {
                            value: null,
                            valueState: null,
                            valueStateText: null,
                            type: 'Number'
                        },
                        color: {
                            value: null,
                            valueState: null,
                            valueStateText: null,
                            type: 'Text'
                        },
                        storage: {
                            value: null,
                            valueState: null,
                            valueStateText: null,
                            type: 'Number'
                        },
                        guarantee: {
                            value: null,
                            valueState: null,
                            valueStateText: null,
                            type: 'Number'
                        },
                        depreciation: {
                            value: null,
                            valueState: null,
                            valueStateText: null,
                            type: 'Number'
                        },
                        fake_price: {
                            value: null,
                            valueState: null,
                            valueStateText: null,
                            type: 'Number'
                        },
                        real_price: {
                            value: null,
                            valueState: null,
                            valueStateText: null,
                            type: 'Number'
                        },
                        status: {
                            value: null,
                            valueState: null,
                            valueStateText: null,
                            type: 'Text'
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
                    _oModel.setProperty("/value/id/isLoading", true);
                    this.getView().getModel().read('/ZC_PHONE_PRICE/$count', {
                        filters: [new Filter("id", "EQ", _phoneId)],
                        success: function (count) {
                            if (count > 0) {
                                _oModel.setProperty("/value/id/valueState", "Error");
                                _oModel.setProperty("/value/id/valueStateText", "phone ID already exists!");
                                _oModel.setProperty("/value/id/isLoading", false);
                            } else {
                                _oModel.setProperty("/value/id/valueState", "Success");
                                _oModel.setProperty("/value/id/valueStateText", null);
                                _oModel.setProperty("/value/id/isLoading", false);
                            }
                        },
                        error: function (err) {
                            _oModel.setProperty("/value/id/isLoading", false);
                            console.log("/ZC_PHONE_PRICE/$count=>", err)
                            alert("/ZC_PHONE_PRICE/$count ERROR!!!")
                        }
                    })
                } else {
                    _oModel.setProperty("/value/id/valueState", null);
                    _oModel.setProperty("/value/id/valueStateText", null);
                }

            },

            onchangeData: function (event) {
                this.getView().byId(event.getSource().getId()).setProperty(`valueStateText`, null);
                this.getView().byId(event.getSource().getId()).setProperty(`valueState`, null);
            },

            submitNewPhone: function () {
                const validationUserInput = () => {
                    const _oModel = this.getView().getModel('new_phone');
                    const _currentPhone = this.getView().getModel('new_phone').getProperty("/value");
                    /////////
                    console.log(_currentPhone)
                    /////////
                    let result = [];
                    for (const property in _currentPhone) {
                        if (!_currentPhone[property].value) {
                            _oModel.setProperty(`/value/${property}/valueState`, "Error");
                            _oModel.setProperty(`/value/${property}/valueStateText`, "This field is required and cannot be empty!");
                            result.push(false);
                        } else {
                            result.push(true);
                        }
                    }
                    return result.every(item => item == true);
                }

                if (validationUserInput()) {
                    BusyIndicator.show(0);
                    const _newPhoneFromView = this.getView().getModel('new_phone').getProperty("/value");
                    const _newPhonePayloadOdata = {};
                    for (const property in _newPhoneFromView) {
                        if (_newPhoneFromView[property].type === 'Number') {
                            _newPhonePayloadOdata[property] = Number(_newPhoneFromView[property].value);
                        } else {
                            _newPhonePayloadOdata[property] = _newPhoneFromView[property].value;
                        }
                    }
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
                } else {

                }
            }
        });
    });