module.exports = (function() {
    'use strict';

    /*
        This is map object to get array of numbers for selected digit
     */
    var numberMapTable = {
        0: [0, 1, 2, 3, 4, 5],
        1: [1, 2],
        2: [0, 1, 3, 4, 6],
        3: [0, 1, 2, 3, 6],
        4: [1, 2, 5, 6],
        5: [0, 2, 3, 5, 6],
        6: [0, 2, 3, 4, 5, 6],
        7: [0, 1, 2, 5],
        8: [0, 1, 2, 3, 4, 5, 6],
        9: [0, 1, 2, 3, 5, 6]
    };

    /*
        This function checks if selected value is number and this is positive / non-NaN / non-Infinity number
     */
    var checkIfNumberIsValid = function(num) {
        return typeof num == 'number' && num != Infinity && num != -Infinity && !isNaN(num) && num >= 0;
    };

    /*
        This function checks if selected number is integer
     */
    var checkIfNumberIsInteger = function(num) {
        return parseInt(num) === parseFloat(num);
    };

    /*
        Simpliest way to get array of digits from selected number
        is to split string that represents that number per char
     */
    var convertNumberToArrayOfDigits = function(num) {
        return num.toString().split("");
    };

    /*
        This function will get valid numbers for hundreds, thousands, etc.
        Parameter "dim" is used to describe what dimension should we used for current number
     */
    var getNumbersByDimension = function (num, dim) {
        // .concat is used to copy selected array of numbers
        var result = numberMapTable[num].concat();

        for (var i = 0; i < result.length; i++)
        {
            result[i] += dim * 7;
        }

        return result;
    };

    /*
        maxDimension will be used to describe what dimension will be max for our numbers.
        In our case 99999 will be valid number. But 100000 - not.
     */
    var maxDimension = 5;

    return function(num) {

        if (!(checkIfNumberIsValid(num) && checkIfNumberIsInteger(num))) {
            return;
        }

        var numArray = convertNumberToArrayOfDigits(num);
        if (numArray.length > maxDimension) {
            return;
        }

        // This is first stage.
        // We are getting last digit of our input number and push array of numbers into result value
        // And make a copy of number array.
        var result = numberMapTable[numArray[numArray.length - 1]].concat();

        // Now we are looping from the second-from-the-end digit to first one and adding these number arrays into result.
        // So if we have number equals to 123:
        // "3" digit is already in result value
        // "2" digit will be added as first digit in the loop with dim = 1
        // "1" digit will be added as second digit in the loop with dim = 2
        for (var i = 1; i < numArray.length; i++) {
            result = result.concat(getNumbersByDimension(numArray[numArray.length - i - 1], i));
        }

        return result;
    }
})();