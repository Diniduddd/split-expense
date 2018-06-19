import splitExpenses from '../splitExpenses';
import {inputValidator} from '../inputValidator';

jest.mock('../inputValidator');

test('should return false when input validation fail', () => {
    inputValidator.mockReturnValue(false);
    expect(splitExpenses([], [])).toEqual(false);
});

test('should return false when input validation fail', () => {
    inputValidator.mockReturnValue(false);
    expect(splitExpenses([], [])).toEqual(false);
});

test('should return true when input empty', () => {
    inputValidator.mockReturnValue(true);
    expect(splitExpenses([], [])).toEqual(true);
});

test('should return true when correct input is given', () => {
    inputValidator.mockReturnValue(true);
    expect(splitExpenses([], [])).toEqual(true);
});

test('should print the share of expense when correct input is given', () => {
    inputValidator.mockReturnValue(true);
    const names = [ 'aaa', 'bbb', 'ccc', 'ddd', 'eee'];
    const  spy = jest.spyOn(console, 'log');
    const transactionArray = [
        {
            name: 'bbb',
            value: 1000
        },
        {
            name: 'ccc',
            value: 3
        },
        {
            name: 'ddd',
            value: 20
        },
        {
            name: 'ccc',
            value: 100
        },
        {
            name: 'eee',
            value: 900
        },
        ];

    expect(splitExpenses(names, transactionArray)).toEqual(true);
    expect(spy).toHaveBeenNthCalledWith(1, "aaa pays $404.6 to bbb");
    expect(spy).toHaveBeenNthCalledWith(2, "ddd pays $190.8 to bbb");
    expect(spy).toHaveBeenNthCalledWith(3, "ddd pays $193.8 to eee");
    expect(spy).toHaveBeenNthCalledWith(4, "ccc pays $301.6 to eee");
});
