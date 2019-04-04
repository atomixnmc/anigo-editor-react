import * as lodash from 'lodash';
import RC4 from 'arc4/lib/lodash/arc4';
import cookie from 'react-cookies';

const MASK_SYMBOL = '●';// '*';
const HYPEN_SYMBOL = '-';

function replacer3Parts(match, p1, p2, p3, offset, string) {
  return [p1, p2, p3].join('');
}

export const isSensitiveKey = (key, fieldObj)=>{
  try {
    if (fieldObj && fieldObj.format) {
      const isFormatSensitive = [
        'password',
        'userid',
        'emailid',
        'korean',
        'english',
        'mobilephone',
        'telephone',
        'creditcard',
        'address',
        'businesslicense',
        'bankbook',
        'idcard',
        'aliencard',
        'passport',
        'passportno',
        'driverlicense'
      ].includes(fieldObj.format.toLowerCase());
      if (isFormatSensitive) {
        // console.log('isSensitiveKey', fieldObj);
      }
      return isFormatSensitive;
    } else {
      return [
        'password',
        'psswrd',
        'passwd',
        // 'username',
        'cvc',
        'card code',
        'cardcode',
        'code'
      ].includes(key.toLowerCase());
    }
  } catch (err) {
    return false;
  }
};

function isHypen(character) {
  return character == HYPEN_SYMBOL;
}
function hasHypen(str) {
  return str.indexOf(HYPEN_SYMBOL) != -1;
}
export function replaceAt(str, index, replace) {
  if (index < 0 || index > str.length) {
    return str;
  }
  return (index == 0 ? '' : str.substring(0, index)) + replace + str.substring(index + 1);
}
function maskFromTo(str, start, end, checkHypen) {

}
function maskExceptFirstLast(str, first, end, checkHypen = true) {
  let veryLastPos = Math.max(0, str.length - 1 - end);
  for (let pos = first; pos <= veryLastPos; pos++) {
    if (checkHypen) {
      if (!isHypen(str[pos])) {
        str = replaceAt(str, pos, MASK_SYMBOL);
      }
    } else {
      str = replaceAt(str, pos, MASK_SYMBOL);
    }
  }
  return str;
}
export function maskOne(str, pos) {
  str = replaceAt(str, pos, MASK_SYMBOL);
  return str;
}
export function maskFromBack(str, num, end = 0, checkHypen = false) {
  // const veryFirstPos = Math.max(0, str.length - (num + end));
  const veryLastPos = Math.max(0, str.length - 1 - end);

  let count = 0;
  for (let pos = veryLastPos; pos >= 0; pos--) {
    if ((checkHypen && !isHypen(str[pos])) || !checkHypen) {
      str = replaceAt(str, pos, MASK_SYMBOL);
      count++;
    }
    if (count >= num) {
      break;
    }
  }
  return str;
}
export function maskSensitiveValue(value, style) {
  if (value == '') {
    return '';
  }
  let newValue = value + '';
  let lengthWithoutHypen = newValue.replace(/-/g, '').length;
  if (style === 'password') {
    newValue = newValue.replace(/./g, MASK_SYMBOL);
  } else if (style === 'userId' || style === 'id') {
    newValue = maskFromBack(newValue, 3);
  } else if (style === 'emailId' || style === 'email') {
    if (newValue.indexOf('@') != -1) {
      const beforeAtPart = newValue.substr(0, newValue.indexOf('@'));
      // console.log(beforeAtPart);
      newValue = maskFromBack(newValue, Math.min(beforeAtPart.length, 3), newValue.length - newValue.indexOf('@'));
    } else {
      newValue = maskFromBack(newValue, 3);
    }
  } else if (style === 'korean') {
    newValue = maskOne(newValue, 1);
  } else if (style === 'english') {
    if (newValue.length <= 2) {
      newValue = newValue;
    } else if (value.length <= 6) {
      newValue = maskOne(newValue, 1);
    } else {
      newValue = maskExceptFirstLast(newValue, 3, 3, false);
    }
  } else if (style === 'mobilePhone' || style === 'mobilephone') {
    if (lengthWithoutHypen == 10) {
      newValue = maskFromBack(newValue, 3, 4, true);
    } else {
      newValue = maskFromBack(newValue, 4, 4, true);
    }
  } else if (style === 'telephone') {
    if (lengthWithoutHypen == 9) {
      newValue = maskFromBack(newValue, 3, 4, true);
    } else {
      newValue = maskFromBack(newValue, 4, 4, true);
    }
  } else if (style === 'creditCard' || style === 'creditcard' || style === 'credit card') {
    newValue = maskFromBack(newValue, 5, 5, true);
  } else if (style === 'address') {
    newValue = maskFromBack(newValue, 3); // 3 last letters
  } else if (style === 'businessLicense' || style === 'businesslicense' || style === 'business license') {
    newValue = maskFromBack(newValue, 4, 2); // 2rd digit from last digit (4 digits)
  } else if (style === 'bankbook') {
    if (lengthWithoutHypen < 10) { // All digit except 2 first and 3 last
      newValue = maskExceptFirstLast(newValue, 2, 3);
    } else { // All digit except 3 first and 5 last
      newValue = maskExceptFirstLast(newValue, 3, 5);
    }
  } else if (style === 'idCard' || style === 'idcard' || style === 'id card') { // 6 last
    newValue = maskFromBack(newValue, 6, 0, true);
  } else if (style === 'alienCard' || style === 'aliencard' || style === 'alien card') { // 6 last
    newValue = maskFromBack(newValue, 6, 0, true);
  } else if (style === 'passport' || style === 'passportno' || style === 'passportNo') { // 4 last
    newValue = maskFromBack(newValue, 4, 0, true);
  } else if (style === 'driverLicense' || style === 'driverlicense' || style === 'driver license') {
    newValue = maskFromBack(newValue, 6, 2, true);
  } else {
    newValue = newValue.replace(/./g, MASK_SYMBOL);
  }
  return newValue;
}

export function maskSensitiveData(jsonText, jsonSchema){
  const jsonObj = lodash.isString(jsonText) ? JSON.parse(jsonText) : jsonText;

  const resultObj = lodash.transform(jsonObj, (result, value, key)=>{
    const fieldObj = jsonSchema[key] || jsonSchema.properties[key];
    if (isSensitiveKey(key, fieldObj)) {
      result[key] = maskSensitiveValue(value, (fieldObj && fieldObj.format) ? fieldObj.format : null);
    } else {
      result[key] = value;
    }
  });
  return resultObj;
}

export const stringToBuffer = (string)=>{
  const buff = [];
  for (let i = 0; i < this.length; i++) {
    buff[i] = this.charCodeAt(i);
  }
  return buff;
};

export const arrayToString = ()=>{
  let string = '';
  for (let i = 0; i < this.length; i++) {
    string += String.fromCharCode(this[i]);
  }
  return string;
};

const defaultCipherKey = cookie.load('api_key'); // 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZWR0bSIsInVzZXJJZCI6IjciLCJlbWFpbCI6InRlc3RpbmciLCJleHAiOjUwMTU0MzI4OTQ2NiwiaWF0IjoxNTQzMjg5NDY';
// let defaultCipher = new RC4(defaultCipherKey);

export function encrypt(originalText, cipherKey) {
  if (!cipherKey && !defaultCipherKey) {
    cipherKey = cookie.load('api_key') || defaultCipherKey;
    // cipher = defaultCipher;
  }
  if (cipherKey) {
    // cipherKey = defaultCipherKey;
    const cipher = new RC4(cipherKey);
    // defaultCipherKey = cipherKey;
    // defaultCipher = cipher;
    const encryptedText = cipher.encodeString(originalText, 'utf-8', 'base64');
    return encryptedText;
  }
}

export function decrypt(testEncryptedText, cipherKey) {
  if (!cipherKey && !defaultCipherKey) {
    cipherKey = cookie.load('api_key') || defaultCipherKey;
    // cipher = defaultCipher;
  }
  if (cipherKey) {
    // cipherKey = defaultCipherKey;
    const cipher = new RC4(cipherKey);
    // defaultCipherKey = cipherKey;
    // defaultCipher = cipher;
    const originalText = cipher.decodeString(testEncryptedText, 'base64', 'utf-8');
    return originalText;
  }
}


export function handleDecrypt(content, cipherKey) {
  let contentObj = {};
  const shouldDecrypt = lodash.isString(content) && content !== '' && content[0] !== '{';
  // console.log(shouldDecrypt, content);
  if (shouldDecrypt) {
    try {
      const decrypted = decrypt(content, cipherKey);
      // console.log(decrypted);
      contentObj = JSON.parse(decrypted);
      // console.log(contentObj);
      return contentObj;
    } catch (ex) {
      // console.error(ex);
      console.log('Can not decrypt', content, cipherKey);
      return {};
    }
  } else {
    return content;
  }
}
