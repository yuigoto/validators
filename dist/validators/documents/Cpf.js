"use strict";
exports.__esModule = true;
var Utils_1 = require("../../utils/Utils");
var Expressions_1 = require("../../utils/Expressions");
var Cpf = (function () {
    function Cpf() {
    }
    Cpf.format = function (input) {
        input = Cpf.sanitize(input);
        if (!input)
            return false;
        if (input.length > 11)
            input = input.substring(0, 11);
        if (input.length < 11)
            input = Utils_1.Utils.padWithZeroes(input, 11);
        return input.replace(Expressions_1.Cpf, "$1.$2.$3-$4");
    };
    Cpf.validate = function (input) {
        input = Cpf.sanitize(input);
        if (!input)
            return false;
        if (input.length > 11)
            input = input.substring(0, 11);
        if (input.length < 11)
            input = Utils_1.Utils.padWithZeroes(input, 11);
        if (Utils_1.Utils.checkNumberRepetition(input, 11))
            return false;
        var sum, val;
        sum = 0;
        for (var l = 0; l < 9; l++) {
            sum += parseInt(input[l]) * (10 - l);
        }
        val = 11 - (sum % 11);
        if (val === 10 || val === 11)
            val = 0;
        if (input[9] !== val.toString())
            return false;
        sum = 0;
        for (var l = 0; l < 10; l++) {
            sum += parseInt(input[l]) * (11 - l);
        }
        val = 11 - (sum % 11);
        if (val === 10 || val === 11)
            val = 0;
        if (input[10] !== val.toString())
            return false;
        return true;
    };
    Cpf.sanitize = function (input) {
        input = Utils_1.Utils.assertIsString(input, true);
        if (input === false)
            return false;
        input = Utils_1.Utils.sanitizeToDigits(input);
        if (!input)
            return false;
        return input;
    };
    return Cpf;
}());
exports.Cpf = Cpf;
