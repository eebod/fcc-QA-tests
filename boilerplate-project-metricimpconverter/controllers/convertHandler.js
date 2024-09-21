function ConvertHandler() {
  const invalidNum = "invalid number";
  const invalidUnit = "invalid unit";

  this.getNum = function (input) {
    if (["kg", "lbs", "gal", "mi", "km", "l", "L"].includes(input)) return 1;
    if (/\//g.test(input)) {
      if (/\d.*\/\d.*(?=\/\d.*)/g.test(input) || /\/\//g.test(input)) return invalidNum;
      let [num, denom] = input.split("/").map(a => parseFloat(a));
      return parseFloat((num / denom).toFixed(5));
    } else {
      let result = input.split("").filter(a => a < "A").join("");
      if (/^\d+\.{0,1}\d+$/g.test(result) || !/(?=\d{2})/g.test(result)) return parseFloat(result);
      return invalidNum;
    }
  };

  this.getUnit = function (input) {
    let result = input.split("").filter(a => a >= "A").join("").toLowerCase();
    if (["kg", "lbs", "gal", "mi", "km"].includes(result)) return result;
    if (result === "l") return "L";
    return invalidUnit;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit) {
      case "gal": result = "L"; break;
      case "L": result = "gal"; break;
      case "lbs": result = "kg"; break;
      case "kg": result = "lbs"; break;
      case "mi": result = "km"; break;
      case "km": result = "mi"; break;
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit) {
      case "gal": result = "galons"; break;
      case "L": result = "litres"; break;
      case "km": result = "kilometers"; break;
      case "mi": result = "miles"; break;
      case "lbs": result = "pounds"; break;
      case "kg": result = "kilograms"; break;
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    switch (initUnit) {
      case "gal": result = initNum * galToL; break;
      case "L": result = initNum / galToL; break;
      case "lbs": result = initNum * lbsToKg; break;
      case "kg": result = initNum / lbsToKg; break;
      case "mi": result = initNum * miToKm; break;
      case "km": result = initNum / miToKm; break;
    }
    return parseFloat(parseFloat(result).toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
}

module.exports = ConvertHandler;