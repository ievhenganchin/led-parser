var displayNumber = require('./display-number.js');

describe('Display number test cases', function() {

    it('Check null value', function() {
        expect(displayNumber(null)).toBeUndefined();
    });

    it('Check string value', function() {
        expect(displayNumber("10")).toBeUndefined();
    });

    it('Check non-integer number', function() {
        expect(displayNumber(10.5)).toBeUndefined();
    });

    it('Check negative number', function() {
        expect(displayNumber(-5)).toBeUndefined();
    });

    it('Check min valid number', function() {
        expect(displayNumber(0)).toEqual([0, 1, 2, 3, 4, 5]);
    });

    it('Check max valid number', function() {
       expect(displayNumber(99999))
           .toEqual([
               0, 1, 2, 3, 5, 6,
               7, 8, 9, 10, 12, 13,
               14, 15, 16, 17, 19, 20,
               21, 22, 23, 24, 26, 27,
               28, 29, 30, 31, 33, 34
           ]);
    });

    it('Check max valid number + 1', function() {
        expect(displayNumber(99999 + 1)).toBeUndefined();
    });

    it('Check 10 as in example',function() {
        expect(displayNumber(10)).toEqual([0, 1, 2, 3, 4, 5, 8, 9]);
    });
});