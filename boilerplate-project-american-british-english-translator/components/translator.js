const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

const reverseDict = (obj) => {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));
};

class Translator {
  toBritishEnglish(text) {
    const dict = { ...americanOnly, ...americanToBritishSpelling };
    const titles = americanToBritishTitles;
    const time = /([1-9]|1[012]):[0-5][0-9]/g;

    return this.translate(text, dict, time, titles, "toBritish") || text;
  }

  toAmericanEnglish(text) {
    const dict = { ...britishOnly, ...reverseDict(americanToBritishSpelling) };
    const titles = reverseDict(americanToBritishTitles);
    const time = /([1-9]|1[012]).[0-5][0-9]/g;

    return this.translate(text, dict, time, titles, "toAmerican") || text;
  }

  translate(text, dict, time, titles, locale) {
    let translatedText = text;

    Object.entries(dict).forEach(([americanWord, britishWord]) => {
      const regex = new RegExp(`\\b${americanWord}\\b`, 'gi');
      translatedText = translatedText.replace(
        regex,
        (match) => `<span class="highlight">${britishWord}</span>`
      );
    });

    Object.entries(titles).forEach(([americanTitle, britishTitle]) => {
      const regex = new RegExp(`\\b${americanTitle}(?=[\\s.,]|$)`, 'gi');
      translatedText = translatedText.replace(
        regex,
        (match) => `<span class="highlight">${britishTitle.charAt(0).toUpperCase() + britishTitle.slice(1)}</span>`
      );
    });

    if (locale === 'toBritish') {
      translatedText = translatedText.replace(time, (match) => `<span class="highlight">${match.replace(':', '.')}</span>`);
    } else if (locale === 'toAmerican') {
      translatedText = translatedText.replace(time, (match) => `<span class="highlight">${match.replace('.', ':')}</span>`);
    }

    return translatedText;
  }
}

module.exports = Translator;