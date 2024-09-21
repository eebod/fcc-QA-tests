const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

    test("whole number input validation", function () {
        assert.equal(convertHandler.getNum("2kg"), 2);
    });

    test("decimal number input validation", function () {
        assert.equal(convertHandler.getNum("2.1mi"), 2.1);
    });

    test("fractional input validation", function () {
        assert.equal(convertHandler.getNum("2/1lbs"), 2);
    });

    test("fractional with a decimal input validation", function () {
        assert.equal(convertHandler.getNum("2.2/3l"), 0.73333);
    });

    test("double-fraction input validation", function () {
        assert.equal(convertHandler.getNum("2/2/3km"), 'invalid number');
    });

    test("no numerical input should return 1", function () {
        assert.equal(convertHandler.getNum("kg"), 1);
    });

    test("3KG unit should return kg", function () {
        assert.equal(convertHandler.getUnit("3KG"), 'kg');
    });

    test("3LBS unit should return lbs", function () {
        assert.equal(convertHandler.getUnit("3LBS"), 'lbs');
    });

    test("3L unit should return l", function () {
        assert.equal(convertHandler.getUnit("3L"), 'L');
    });

    test("3GAL unit should return gal", function () {
        assert.equal(convertHandler.getUnit("3GAL"), 'gal');
    });

    test("3MI unit should return mi", function () {
        assert.equal(convertHandler.getUnit("3MI"), 'mi');
    });

    test("3KM unit should return km", function () {
        assert.equal(convertHandler.getUnit("3KM"), 'km');
    });


    test("correctly convert gal to L", function () {
        assert.equal(convertHandler.convert(3, 'gal'), 11.35623);
    });
    test("correctly convert L to gal", function () {
        assert.equal(convertHandler.convert(3, 'L'), 0.79252);
    });
    test("correctly convert mi to km", function () {
        assert.equal(convertHandler.convert(3, 'mi'), 4.82802);
    });
    test("correctly convert km to mi", function () {
        assert.equal(convertHandler.convert(3, 'km'), 1.86412);
    });
    test("correctly convert kg to lbs", function () {
        assert.equal(convertHandler.convert(3, 'kg'), 6.61387);
    });
    test("correctly convert lbs to kg", function () {
        assert.equal(convertHandler.convert(3, 'lbs'), 1.36078);
    });

});