"use strict";
exports.__esModule = true;
var Expressions_1 = require("../../utils/Expressions");
var Email = (function () {
    function Email() {
    }
    Email.validateAddress = function (address) {
        if (typeof address !== "string")
            return false;
        address = address.trim();
        if (address === "")
            return false;
        return Expressions_1.Email.test(address);
    };
    return Email;
}());
exports.Email = Email;
