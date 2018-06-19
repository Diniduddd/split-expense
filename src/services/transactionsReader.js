import _ from 'lodash';

import fileReader from '../utils/fileReader';
import appConfig from '../../config/appConfig';
import logger from '../utils/logger';
import {filePathValidator} from './inputValidator';

const roundingPrecision = appConfig.roundingPrecision;

function  getTransactionData (dataString) {
    const transactionsStrArray = dataString.split(/\r?\n/);
    let transactionsArray;
    try {
        transactionsArray = transactionsStrArray.map(traString => {
            return {
                name: traString.replace(/[^a-zA-Z0-9 ]/g, "").match(/(.*?) paid/)[1],
                value: _.round(parseFloat(traString.replace(/[^a-zA-Z0-9. ]/g, "").match(/paid (.*?) for/)[1]), roundingPrecision)
            }   
        });
    }
    catch(e) {
        logger.debug(e);
        logger.error('error in data format of expense transactions input file');
        throw new Error('error in data format of expense transactions input file');
    }
    return transactionsArray;
}

function transactionsReader (filePath) {
    if(!filePathValidator(filePath)) {
        logger.error(`${filePath} input file path is not valid`);
        throw new Error(`${filePath} input file path is not valid`);
    }
    const nameString = fileReader(filePath);
    const generatedData = getTransactionData(nameString);
    logger.trace('finish reading transaction data');
    return generatedData;
}

export default transactionsReader;