import assert from 'assert';

import {
  maskFromBack, maskSensitiveValue, replaceAt
} from '../../src/utils/dataSecurityUtil';
import {
  isRegExp
} from 'util';

describe('all masking works', function() {
  it('should replace at', function() {
    assert.equal(replaceAt('1234567-abc', 6, '●'), '123456●-abc');
  });
  it('should mask from back', function() {
    assert.equal(maskFromBack('1234567-abc', 4, 0, false), '1234567●●●●');
    assert.equal(maskFromBack('1234567-abc', 4, 0, true), '123456●-●●●');
    assert.equal(maskFromBack('1234567-abc', 4, 1, false), '123456●●●●c');
  });
  it('should mask password', function() {
    assert.equal(maskSensitiveValue('1234567', 'password'), '●●●●●●●');
  });
  it('should mask id', function() {
    assert.equal(maskSensitiveValue('abcabc', 'id'), 'abc●●●');
  });
  it('should mask email', function() {
    assert.equal(maskSensitiveValue('1234567@abc.com', 'email'), '1234●●●@abc.com');
    assert.equal(maskSensitiveValue('12@abc.com', 'email'), '●●@abc.com');
    assert.equal(maskSensitiveValue('1@abc.com', 'email'), '●@abc.com');
  });
  it('should mask korean', function() {
    assert.equal(maskSensitiveValue('토대왕', 'korean'), '토●왕');
  });
  it('should mask english', function() {
    assert.equal(maskSensitiveValue('HON******ONG', 'english'), 'HON●●●●●●ONG');
  });
  it('should mask mobilephone', function() {
    assert.equal(maskSensitiveValue('0120001234', 'mobilephone'), '012●●●1234');
    assert.equal(maskSensitiveValue('01200001234', 'mobilephone'), '012●●●●1234');
    assert.equal(maskSensitiveValue('012300001234', 'mobilephone'), '0123●●●●1234');
  });
  it('should mask telephone', function() {
    assert.equal(maskSensitiveValue('010001234', 'telephone'), '01●●●1234');
    assert.equal(maskSensitiveValue('01200001234', 'telephone'), '012●●●●1234');
    assert.equal(maskSensitiveValue('012300001234', 'telephone'), '0123●●●●1234');
  });
  it('should mask creditcard', function() {
    assert.equal(maskSensitiveValue('1234-567*-****-1234', 'creditcard'), '1234-567●-●●●●-1234');
  });
  it('should mask address', function() {
    assert.equal(maskSensitiveValue('서울시 영등포구 문래동 ***', 'address'), '서울시 영등포구 문래동 ●●●');
  });
  it('should mask business license', function() {
    assert.equal(maskSensitiveValue('123-45-****00', 'business license'), '123-45-●●●●00');
    assert.equal(maskSensitiveValue('12345****00', 'business license'), '12345●●●●00');
  });
  it('should mask bankbook', function() {
    assert.equal(maskSensitiveValue('12-***-123', 'bankbook'), '12-●●●-123');
    assert.equal(maskSensitiveValue('12-****-123', 'bankbook'), '12-●●●●-123');
    assert.equal(maskSensitiveValue('123-**-12345', 'bankbook'), '123-●●-12345');
    assert.equal(maskSensitiveValue('123-******-12345', 'bankbook'), '123-●●●●●●-12345');

    assert.equal(maskSensitiveValue('12***123', 'bankbook'), '12●●●123');
    assert.equal(maskSensitiveValue('12****123', 'bankbook'), '12●●●●123');
    assert.equal(maskSensitiveValue('123**12345', 'bankbook'), '123●●12345');
    assert.equal(maskSensitiveValue('123*****12345', 'bankbook'), '123●●●●●12345');
  });
  it('should mask id card', function() {
    assert.equal(maskSensitiveValue('190103-1******', 'id card'), '190103-1●●●●●●');
  });
  it('should mask alien card', function() {
    assert.equal(maskSensitiveValue('190103-1******', 'alien card'), '190103-1●●●●●●');
  });
  it('should mask passport', function() {
    assert.equal(maskSensitiveValue('123****', 'passport'), '123●●●●');
  });
  it('should mask driver license', function() {
    assert.equal(maskSensitiveValue('서울89-******-00', 'driver license'), '서울89-●●●●●●-00');
  });
});
