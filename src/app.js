import readline  from 'readline-sync';

import nameReader from './services/nameReader';
import transactionsReader from './services/transactionsReader';
import splitExpenses from './services/splitExpenses';
import logger from './utils/logger';
import appConfig from '../config/appConfig';

let userNames;
let transactions;

const nameFilePath = readline.question(`Enter path to name file? (${appConfig.defaultInputNameFilePath})`);
const transactionFilePath = readline.question(`Enter path to expense transaction file ? (${appConfig.defaultExpenseTransactionFilePath})`);

try{
    userNames = nameReader(nameFilePath === '' ? appConfig.defaultInputNameFilePath : nameFilePath);
    transactions = transactionsReader(transactionFilePath === '' ? appConfig.defaultExpenseTransactionFilePath : transactionFilePath);
}
catch(e) {
    logger.debug(e);
    logger.error('error when reading input files');
    process.exit();
}

splitExpenses(userNames, transactions);

