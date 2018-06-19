'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pino = require('pino');

var Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);

        var isDev = process.env.NODE_ENV === 'development';

        this.logger = pino({
            name: 'main',
            prettyPrint: isDev,
            level: isDev ? 'trace' : 'warn'
        });
    }

    _createClass(Logger, [{
        key: 'trace',
        value: function trace(message) {
            this.logger.trace(message);
        }
    }, {
        key: 'debug',
        value: function debug(message) {
            this.logger.debug(message);
        }
    }, {
        key: 'info',
        value: function info(message) {
            this.logger.info(message);
        }
    }, {
        key: 'warn',
        value: function warn(message) {
            this.logger.warn(message);
        }
    }, {
        key: 'error',
        value: function error(message) {
            this.logger.error(message);
        }
    }, {
        key: 'fatal',
        value: function fatal(message) {
            this.logger.fatal(message);
        }
    }]);

    return Logger;
}();

exports.default = new Logger();