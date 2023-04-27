sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("movies.controller.Dashboard", {
            onInit: function () {

            },
            onPress: function (sValue) {
                sap.ui.require(["sap/m/MessageToast"], function (oMessage) {
                    oMessage.show("Searching..." + sValue);
                });
            }
        });
    });
