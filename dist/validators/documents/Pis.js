"use strict";
exports.__esModule = true;
var Utils_1 = require("../../utils/Utils");
var Expressions_1 = require("../../utils/Expressions");
var Pis = (function () {
    function Pis() {
    }
    Pis.format = function (input) {
        input = Pis.sanitize(input);
        if (input === false)
            return false;
        if (input.length > 11)
            input = input.substring(0, 11);
        if (input.length < 11)
            input = Utils_1.Utils.padWithZeroes(input, 11);
        return input.replace(Expressions_1.Pis, "$1.$2.$3-$4");
    };
    Pis.validate = function (input) {
        input = Pis.sanitize(input);
        if (input === false)
            return false;
        if (input.length > 11)
            input = input.substring(0, 11);
        if (input.length < 11)
            input = Utils_1.Utils.padWithZeroes(input, 11);
        if (Utils_1.Utils.checkNumberRepetition(input, 11))
            return false;
        var sum, val, multiplier;
        multiplier = 3;
        sum = 0;
        for (var l = 0; l < 10; l++) {
            sum += multiplier * input[l];
            multiplier -= 1;
            if (multiplier === 1)
                multiplier = 9;
        }
        val = 11 - (sum % 11);
        val = (val === 10 || val === 11) ? 0 : val;
        if (input[10] !== val.toString()) {
            return false;
        }
        return true;
    };
    Pis.sanitize = function (input) {
        input = Utils_1.Utils.assertIsString(input, true);
        if (input === false)
            return false;
        input = Utils_1.Utils.sanitizeToDigits(input);
        if (!input)
            return false;
        return input;
    };
    return Pis;
}());
exports.Pis = Pis;
