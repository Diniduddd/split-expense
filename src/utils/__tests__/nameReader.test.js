import fileReader from '../fileReader';
import fs from 'fs';
import RandExp from 'randexp';

jest.mock('fs');

test('should read contend from given file', () => {

  let fileContend = new RandExp(/random stuff: .+/).gen()
  fs.readFileSync.mockReturnValue(fileContend);  
  expect(fileReader('./inputData/names.txt')).toBe(fileContend);
  expect(fs.readFileSync).toHaveBeenCalled();
  
});

test('should handle error when file reader throw error', () => {
  fs.readFileSync.mockImplementation(() => {
    throw new Error();
  });
  expect(fileReader).toThrowError(/can not find the file specified by the path/);
  expect(fs.readFileSync).toHaveBeenCalled();
  
});