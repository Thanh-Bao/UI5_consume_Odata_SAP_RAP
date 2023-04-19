/*global QUnit*/

sap.ui.define([
	"baobaostore.com/controller/ZC_PHONE_PRICE.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ZC_PHONE_PRICE Controller");

	QUnit.test("I should test the ZC_PHONE_PRICE controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
