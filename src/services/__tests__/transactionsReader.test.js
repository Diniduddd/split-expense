import RandExp from 'randexp';

import transactionsReader from '../transactionsReader';
import fileReader from '../../utils/fileReader';
import {filePathValidator} from '../inputValidator';

jest.mock('../../utils/fileReader');
jest.mock('../inputValidator');

test('should throw an error when the file path validator return false', () => {
    filePathValidator.mockReturnValue(false);
    expect(transactionsReader).toThrowError(/input file path is not valid/);
});

test('should throw an error when the file data are not in proper order', () => {
    filePathValidator.mockReturnValue(true);
    fileReader.mockReturnValue(new RandExp(/[a-z1-9]{50}/).gen());
    expect(transactionsReader).toThrowError(/error in data format of expense transactions input file/);
});

test('should return array of transactions done by users', () => {
    filePathValidator.mockReturnValue(true);
    let transactionArray = [
        {
            name: new RandExp(/[a-z]{5}/).gen(),
            value: parseFloat(new RandExp(/[0-9]{5}/).gen())
        },
        {
            name: new RandExp(/[a-z]{5}/).gen(),
            value: parseFloat(new RandExp(/[0-9]{5}/).gen())
        },
        {
            name: new RandExp(/[a-z]{5}/).gen(),
            value: parseFloat(new RandExp(/[0-9]{5}/).gen())
        },
        {
            name: new RandExp(/[a-z]{5}/).gen(),
            value: parseFloat(new RandExp(/[0-9]{5}/).gen())
        }
    ]
    fileReader.mockReturnValue(transactionArray.map(transaction => `${transaction.name} paid $${transaction.value} for ${new RandExp(/[a-z ]{5}/).gen()}`).join('\n'));
    expect(transactionsReader('xyz')).toEqual(transactionArray);
});