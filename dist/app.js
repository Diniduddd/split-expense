'use strict';

var _readlineSync = require('readline-sync');

var _readlineSync2 = _interopRequireDefault(_readlineSync);

var _nameReader = require('./services/nameReader');

var _nameReader2 = _interopRequireDefault(_nameReader);

var _transactionsReader = require('./services/transactionsReader');

var _transactionsReader2 = _interopRequireDefault(_transactionsReader);

var _splitExpenses = require('./services/splitExpenses');

var _splitExpenses2 = _interopRequireDefault(_splitExpenses);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _appConfig = require('../config/appConfig');

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userNames = void 0;
var transactions = void 0;

var nameFilePath = _readlineSync2.default.question('Enter path to name file? (' + _appConfig2.default.defaultInputNameFilePath + ')');
var transactionFilePath = _readlineSync2.default.question('Enter path to expense transaction file ? (' + _appConfig2.default.defaultExpenseTransactionFilePath + ')');

try {
    userNames = (0, _nameReader2.default)(nameFilePath === '' ? _appConfig2.default.defaultInputNameFilePath : nameFilePath);
    transactions = (0, _transactionsReader2.default)(transactionFilePath === '' ? _appConfig2.default.defaultExpenseTransactionFilePath : transactionFilePath);
} catch (e) {
    _logger2.default.debug(e);
    _logger2.default.error('error when reading input files');
    process.exit();
}

(0, _splitExpenses2.default)(userNames, transactions);