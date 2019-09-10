"use strict";
exports.__esModule = true;
var Utils = (function () {
    function Utils() {
    }
    Utils.assertIsString = function (input, notEmpty) {
        if (notEmpty === void 0) { notEmpty = false; }
        if (typeof input !== "number" && typeof input !== "string")
            return false;
        if (typeof input === "number")
            input = input.toString();
        input = input.trim();
        if (notEmpty === true && input === "")
            return false;
        return input;
    };
    Utils.checkNumberRepetition = function (value, length) {
        if (length === void 0) { length = 11; }
        if (!Utils.isNumberOrString(value))
            return false;
        if (typeof value === "number")
            value = value.toString();
        for (var i = 0; i < 10; i++) {
            var _rgx = new RegExp("^" + i + "{" + length + "}$", "g");
            if (_rgx.test(value))
                return true;
        }
        return false;
    };
    Utils.isNumberOrString = function (value) {
        return (typeof value === "number" || typeof value === "string");
    };
    Utils.padWithZeroes = function (value, length, toRight) {
        if (length === void 0) { length = 11; }
        if (toRight === void 0) { toRight = false; }
        if (!Utils.isNumberOrString(value))
            return false;
        if (typeof value === "number")
            value = value.toString();
        if (value.length < (length || 11)) {
            while (value.length < (length || 11)) {
                value = (toRight) ? value + "0" : "0" + value;
            }
        }
        return value;
    };
    Utils.sanitizeToDigits = function (value) {
        if (!Utils.isNumberOrString(value))
            return false;
        if (typeof value === "number")
            value = value.toString();
        if (value === undefined || value === null || value === "")
            return false;
        return value.replace(/[^\d]/g, "");
    };
    return Utils;
}());
exports.Utils = Utils;
