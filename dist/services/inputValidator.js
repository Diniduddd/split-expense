'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filePathValidator = exports.inputValidator = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _isValidPath = require('is-valid-path');

var _isValidPath2 = _interopRequireDefault(_isValidPath);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inputValidator(users, transactions) {
    var valid = true;
    _lodash2.default.forEach(transactions, function (transaction) {
        if (users.indexOf(transaction.name) < 0) {
            _logger2.default.error('error in ​expense​ ​transactions input, contains transactions done someone not in name list');
            valid = false;
        }
        if (isNaN(transaction.value)) {
            _logger2.default.error('error in expense​ ​transactions input, transaction value is not clear');
            valid = false;
        }
    });
    _logger2.default.trace('finish input validation');
    return valid;
}

function filePathValidator(path) {
    _logger2.default.trace('validating file path ' + path);
    return (0, _isValidPath2.default)(path);
}

exports.inputValidator = inputValidator;
exports.filePathValidator = filePathValidator;