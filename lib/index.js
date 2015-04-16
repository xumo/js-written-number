/*global writtenNumber */

'use strict';
exports = module.exports = writtenNumber;

var baseCardinals = exports.baseCardinals = {
  0: 'cero',
  1: 'uno',
  2: 'dos',
  3: 'tres',
  4: 'cuatro',
  5: 'cinco',
  6: 'seis',
  7: 'siete',
  8: 'ocho',
  9: 'nueve',
  10: 'diez',
  11: 'once',
  12: 'doce',
  13: 'trece',
  14: 'catorce',
  15: 'quince',
  16: 'dieciseis',
  17: 'diecisiete',
  18: 'dieciocho',
  19: 'diecinueve',
  20: 'veinte',
  30: 'treinta',
  40: 'cuarenta',
  50: 'cincuenta',
  60: 'sesenta',
  70: 'setenta',
  80: 'ochenta',
  90: 'noventa',
};

var units = exports.units = [
  'cientos',
  'mil',
  'millon',
  'billon',
  'trillon',
  'quatrillon',
  'quintillon',
  'sextillon',
  'septillon',
  'octillon',
  'novillon',
  'decillon',
  'undecillon',
  'duodecillon',
  'tridecillon',
  'quattuordecillion',
  'quindecillion',
];

var mults = units.map(function(x, i) {
  if(i === 0) return 100;
  else return Math.pow(1000, i);
});

function writtenNumber(n, noAnd) {
  if(n < 20) {
    return baseCardinals[n];
  }

  if(n < 100) {
    var dec = Math.floor(n / 10) * 10;
    var unit = n - dec;
    if(unit) {
      return baseCardinals[dec] + '-' + writtenNumber(unit);
    }
    return baseCardinals[dec];
  }

  var m = n % 100;
  var ret = [];
  if(m) {
    if(!noAnd) {
      ret.push('and ' + writtenNumber(m));
    } else ret.push(writtenNumber(m));
    n -= m;
  } else ret = [];

  for(var i = 0, len = units.length; i < len; i++) {
    var r = Math.floor(n / mults[i]);
    if(i === 0) {
      r %= 10;
    } else r %= 1000;

    if(r) {
      ret.push(writtenNumber(r, true) + ' ' + units[i]);
    }
  }
  return ret.reverse().join(' ');
}
