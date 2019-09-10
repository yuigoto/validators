"use strict";
exports.__esModule = true;
var Utils_1 = require("../../utils/Utils");
var CreditCardList_1 = require("../../utils/CreditCardList");
var CreditCard = (function () {
    function CreditCard() {
    }
    CreditCard.validateFlag = function (input) {
        input = Utils_1.Utils.assertIsString(input);
        if (input === false)
            return false;
        input = Utils_1.Utils.sanitizeToDigits(input);
        if (input === "")
            return false;
        var keys = Object.keys(CreditCardList_1.CreditCardList);
        for (var i in keys) {
            var key = keys[i];
            var card = CreditCardList_1.CreditCardList[key];
            if (card.pattern.test(input))
                return card.slug;
        }
        return false;
    };
    CreditCard.validateModulo = function (input) {
        input = Utils_1.Utils.assertIsString(input);
        if (input === false)
            return false;
        input = Utils_1.Utils.sanitizeToDigits(input);
        if (input === "")
            return false;
        var exploded = input.trim().split(""), sum = 0;
        exploded = exploded.reverse();
        for (var n = 0; n < exploded.length; n++) {
            var _value = parseInt(exploded[n]);
            sum += (n % 2 === 0) ? _value : CreditCard.MODULO[_value];
        }
        return (sum % 10 === 0);
    };
    CreditCard.validateDigit = function (input) {
        input = Utils_1.Utils.assertIsString(input);
        if (input === false)
            return false;
        input = Utils_1.Utils.sanitizeToDigits(input);
        if (input === "")
            return false;
        var exploded = input.trim().split(""), sum = 0, digit = exploded.pop(), check;
        exploded = exploded.reverse();
        for (var n = 0; n < exploded.length; n++) {
            var _value = parseInt(exploded[n]);
            sum += (n % 2 === 0) ? CreditCard.MODULO[_value] : _value;
        }
        check = (10 - (sum % 10)) % 10;
        return (check === parseInt(digit));
    };
    CreditCard.MODULO = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
    return CreditCard;
}());
exports.CreditCard = CreditCard;
