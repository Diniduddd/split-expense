import RandExp from 'randexp';

import nameReader from '../nameReader';
import fileReader from '../../utils/fileReader';
import {filePathValidator} from '../inputValidator';

jest.mock('../../utils/fileReader');
jest.mock('../inputValidator');

test('should throw an error when the file path validator return false', () => {
    filePathValidator.mockReturnValue(false);
    expect(nameReader).toThrowError(/input file path is not valid/);
});

test('should return an array of names when the contend is correct', () => {
    filePathValidator.mockReturnValue(true);
    let nameArray = [new RandExp(/[a-z]{5}/).gen(), new RandExp(/[a-z]{2}/).gen(), new RandExp(/[a-z]{10}/).gen()]
    fileReader.mockReturnValue(nameArray.join('\n'));
    expect(nameReader('xyz')).toEqual(nameArray);

});