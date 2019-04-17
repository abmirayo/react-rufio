/*
  Originally from https://github.com/EFForg/OpenWireless/blob/master/app/js/diceware.js
  inspired by http://stackoverflow.com/questions/18230217/javascript-generate-a-random-number-within-a-range-using-crypto-getrandomvalues
  and modified to match style of the rest of this project

  OpenWireless Router Software
  Copyright © 2014 EFF and other contributors
  Licensed Apache, Version 2.0
  https://www.apache.org/licenses/LICENSE-2.0.html

 */
const getCryptographicallySecureRandomInt = (min, max) => {
  let rval = 0,
      range = max - min,
      bitsNeeded = Math.ceil(Math.log2(range))

  if (bitsNeeded > 53) {
    throw "We cannot generate numbers larger than 53 bits."
  }

  let bytesNeeded = Math.ceil(bitsNeeded / 8),
      mask = Math.pow(2, bitsNeeded) - 1;
  // 7776 -> (2^13 = 8192) -1 == 8191 or 0x00001111 11111111

  // Create byte array and fill with N random numbers
  let byteArray = new Uint8Array(bytesNeeded);
  window.crypto.getRandomValues(byteArray);

  let p = (bytesNeeded - 1) * 8;
  for(var i = 0; i < bytesNeeded; i++ ) {
    rval += byteArray[i] * Math.pow(2, p);
    p -= 8;
  }

  // Use & to apply the mask and reduce the number of recursive lookups
  rval = rval & mask;

  if (rval >= range) {
    // Integer out of acceptable range
    return getCryptographicallySecureRandomInt(min, max);
  }
  // Return an integer that falls within the range
  return min + rval;
}

export default getCryptographicallySecureRandomInt
