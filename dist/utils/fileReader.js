'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fileReader(filePath) {
    try {
        _logger2.default.trace('opening the file in ' + filePath);
        return _fs2.default.readFileSync(filePath, "utf8");
    } catch (e) {
        _logger2.default.debug(e);
        _logger2.default.error('can not find the file specified by the path ' + filePath);
        throw new Error('can not find the file specified by the path ' + filePath);
    }
}

exports.default = fileReader;