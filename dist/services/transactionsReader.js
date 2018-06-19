'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fileReader = require('../utils/fileReader');

var _fileReader2 = _interopRequireDefault(_fileReader);

var _appConfig = require('../../config/appConfig');

var _appConfig2 = _interopRequireDefault(_appConfig);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _inputValidator = require('./inputValidator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var roundingPrecision = _appConfig2.default.roundingPrecision;

function getTransactionData(dataString) {
    var transactionsStrArray = dataString.split(/\r?\n/);
    var transactionsArray = void 0;
    try {
        transactionsArray = transactionsStrArray.map(function (traString) {
            return {
                name: traString.replace(/[^a-zA-Z0-9 ]/g, "").match(/(.*?) paid/)[1],
                value: _lodash2.default.round(parseFloat(traString.replace(/[^a-zA-Z0-9. ]/g, "").match(/paid (.*?) for/)[1]), roundingPrecision)
            };
        });
    } catch (e) {
        _logger2.default.debug(e);
        _logger2.default.error('error in data format of expense transactions input file');
        throw new Error('error in data format of expense transactions input file');
    }
    return transactionsArray;
}

function transactionsReader(filePath) {
    if (!(0, _inputValidator.filePathValidator)(filePath)) {
        _logger2.default.error(filePath + ' input file path is not valid');
        throw new Error(filePath + ' input file path is not valid');
    }
    var nameString = (0, _fileReader2.default)(filePath);
    var generatedData = getTransactionData(nameString);
    _logger2.default.trace('finish reading transaction data');
    return generatedData;
}

exports.default = transactionsReader;