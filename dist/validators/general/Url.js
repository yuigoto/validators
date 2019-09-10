"use strict";
exports.__esModule = true;
var Expressions_1 = require("../../utils/Expressions");
var Url = (function () {
    function Url() {
    }
    Url.validate = function (url) {
        if (typeof url !== "string")
            return false;
        url = url.trim();
        if (url === "")
            return false;
        return Expressions_1.Url.test(url);
    };
    return Url;
}());
exports.Url = Url;
