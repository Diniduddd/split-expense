'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fileReader = require('../utils/fileReader');

var _fileReader2 = _interopRequireDefault(_fileReader);

var _inputValidator = require('./inputValidator');

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nameReader(filePath) {
    if (!(0, _inputValidator.filePathValidator)(filePath)) {
        _logger2.default.error(filePath + ' input file path is not valid');
        throw new Error(filePath + ' input file path is not valid');
    }
    var nameString = (0, _fileReader2.default)(filePath);
    var userNames = nameString.split(/\r?\n/);
    _logger2.default.trace('finish reading user name data');
    return userNames;
}

exports.default = nameReader;