import RandExp from 'randexp';

import {inputValidator, filePathValidator} from '../inputValidator';

test('should return true for valied file path', () => {
  let filePath = new RandExp(/[a-z]{5}\/[a-z]{5}\.[a-z]{5}/).gen();
  expect(filePathValidator(filePath)).toBe(true);
  
});

test('should return true for valied file path', () => {
  let filePath = new RandExp(/[a-z]{5}\/\*\.[a-z]{5}/).gen();
  expect(filePathValidator(filePath)).toBe(false);
  
});

test('should return false when the transaction list contains a name which is not in name list', () => {
  let nameList = [new RandExp(/[a-z]{5}/).gen(), new RandExp(/[a-z]{5}/).gen(), new RandExp(/[a-z]{5}/).gen()];
  let transactionList = [
    {
      name: nameList[0],
      value: parseInt(new RandExp(/[0-9]{5}/).gen())
    },
    {
      name: nameList[2],
      value: parseInt(new RandExp(/[0-9]{5}/).gen())
    },
    {
      name: new RandExp(/[a-z]{7}/).gen(),
      value: parseInt(new RandExp(/[0-9]{5}/).gen())
    }
  ];
  expect(inputValidator(nameList, transactionList)).toBe(false);
  
});

test('should return false when the transaction list contains a not number as a value', () => {
    let nameList = [new RandExp(/[a-z]{5}/).gen(), new RandExp(/[a-z]{5}/).gen(), new RandExp(/[a-z]{5}/).gen()];
    let transactionList = [
        {
            name: nameList[0],
            value: parseInt(new RandExp(/[0-9]{5}/).gen())
        },
        {
            name: nameList[2],
            value: parseInt(new RandExp(/[0-9]{5}/).gen())
        },
        {
            name: nameList[2],
            value: NaN
        }
    ];
    expect(inputValidator(nameList, transactionList)).toBe(false);

});

test('should return false when the transaction list contains a not number as a value', () => {
    let nameList = [new RandExp(/[a-z]{5}/).gen(), new RandExp(/[a-z]{5}/).gen(), new RandExp(/[a-z]{5}/).gen()];
    let transactionList = [
        {
            name: nameList[0],
            value: parseInt(new RandExp(/[0-9]{5}/).gen())
        },
        {
            name: nameList[2],
            value: parseInt(new RandExp(/[0-9]{5}/).gen())
        },
        {
            name: nameList[2],
            value: parseInt(new RandExp(/[0-9]{5}/).gen())
        }
    ];
    expect(inputValidator(nameList, transactionList)).toBe(true);

});