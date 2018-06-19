import _ from 'lodash';
import isValidPath from 'is-valid-path';

import logger from '../utils/logger';

 function inputValidator(users, transactions) {
     let valid = true;
    _.forEach(transactions, (transaction) => {
        if(users.indexOf(transaction.name) < 0) {
            logger.error('error in ​expense​ ​transactions input, contains transactions done someone not in name list');
            valid = false;
        }
        if(isNaN(transaction.value)) {
            logger.error('error in expense​ ​transactions input, transaction value is not clear');
            valid = false;
        }
    });
     logger.trace(`finish input validation`);
    return valid;
}

function filePathValidator(path) {
    logger.trace(`validating file path ${path}`);
    return isValidPath(path);
}

export {inputValidator, filePathValidator};