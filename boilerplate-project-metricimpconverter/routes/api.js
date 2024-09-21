'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  app.get('/api/convert', (req, res) => {
    const convertHandler = new ConvertHandler();
    const { input } = req.query;
    const getNum = convertHandler.getNum(input);
    const getUnit = convertHandler.getUnit(input);

    if (getNum === 'invalid number' && getUnit === 'invalid unit') {
      return res.status(200).send('invalid number and unit');
    } else if (getNum === 'invalid number') {
      return res.status(200).send('invalid number');
    } else if (getUnit === 'invalid unit') {
      return res.status(200).send('invalid unit');
    } else {
      const getReturnUnit = convertHandler.getReturnUnit(getUnit);
      const spellOutUnit = convertHandler.spellOutUnit(getUnit);
      const spellOutInitUnit = convertHandler.spellOutUnit(getReturnUnit);
      const convert = convertHandler.convert(getNum, getUnit);
      const getString = convertHandler.getString(getNum, spellOutUnit, convert, spellOutInitUnit);

      return res.status(200).json({
        initNum: getNum,
        initUnit: getUnit,
        returnNum: convert,
        returnUnit: getReturnUnit,
        string: getString
      });
    }
  });
};