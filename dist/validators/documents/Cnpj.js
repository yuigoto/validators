"use strict";
exports.__esModule = true;
var Utils_1 = require("../../utils/Utils");
var Expressions_1 = require("../../utils/Expressions");
var Cnpj = (function () {
    function Cnpj() {
    }
    Cnpj.format = function (input) {
        input = Cnpj.sanitize(input);
        if (!input)
            return false;
        if (input.length > 14)
            input = input.substring(0, 14);
        if (input.length < 14)
            input = Utils_1.Utils.padWithZeroes(input, 14);
        return input.replace(Expressions_1.Cnpj, "$1.$2.$3/$4-$5");
    };
    Cnpj.validate = function (input) {
        input = Cnpj.sanitize(input);
        if (input === false)
            return false;
        if (input.length > 14)
            input = input.substring(0, 14);
        if (input.length < 14)
            input = Utils_1.Utils.padWithZeroes(input, 14);
        if (Utils_1.Utils.checkNumberRepetition(input, 14))
            return false;
        var sum, val;
        sum = 0;
        val = 5;
        for (var l = 0; l < 12; l++) {
            sum += parseInt(input[l]) * val;
            val = ((val - 1) === 1) ? 9 : val - 1;
        }
        val = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
        if (input[12] !== val.toString())
            return false;
        sum = 0;
        val = 6;
        for (var l = 0; l < 13; l++) {
            sum += parseInt(input[l]) * val;
            val = ((val - 1) === 1) ? 9 : val - 1;
        }
        val = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
        if (input[13] !== val.toString())
            return false;
        return true;
    };
    Cnpj.sanitize = function (input) {
        input = Utils_1.Utils.assertIsString(input, true);
        if (input === false)
            return false;
        input = Utils_1.Utils.sanitizeToDigits(input);
        if (!input)
            return false;
        return input;
    };
    return Cnpj;
}());
exports.Cnpj = Cnpj;
