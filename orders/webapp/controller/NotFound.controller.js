sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
    "use strict";


    return Controller.extend("orders.controller.NotFound", {

        onInit: function () {
            var oRouter, oTarget;

            oRouter = UIComponent.getRouterFor(this);
            oTarget = oRouter.getTarget("notFound");
            oTarget.attachDisplay(function (oEvent) {
                this._oData = oEvent.getParameter("data");	// store the data
            }, this);
        },

        // override the parent's onNavBack (inherited from BaseController)
        onNavBack: function () {
            // in some cases we could display a certain target when the back button is pressed
            if (this._oData && this._oData.fromTarget) {
                UIComponent.getRouterFor(this).getTargets().display(this._oData.fromTarget);
                delete this._oData.fromTarget;
                return;
            }

            var oHistory, sPreviousHash;

            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                UIComponent.getRouterFor(this).navTo("RouteDashboard", {}, true /*no history*/);
            }
        }
    });
});

