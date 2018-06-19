'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _inputValidator = require('./inputValidator');

var _appConfig = require('../../config/appConfig');

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var roundingPrecision = _appConfig2.default.roundingPrecision;

var users = void 0;
var transactions = void 0;
var perPersonShare = void 0;
var userExpenses = void 0;
var creditUsers = [];
var debitUsers = [];

function calculatePerPersonShare() {
    _logger2.default.trace('calculating per person share');
    var userExpensesData = {};
    _lodash2.default.forEach(users, function (user) {
        userExpensesData[user] = 0;
    });
    var userData = transactions.reduce(function (userData, ele) {
        userData.total += ele.value;
        userData.groups[ele.name] += ele.value;
        return userData;
    }, { groups: userExpensesData, total: 0 });

    perPersonShare = users.length > 0 ? _lodash2.default.round(userData.total / users.length, roundingPrecision) : 0;
    userExpenses = userData.groups;
}

function printSettlementTransactions(payer, receiver, amount) {
    console.log(payer + ' pays $' + _lodash2.default.round(amount, 2) + ' to ' + receiver);
}

function identifyCreditAndDebit() {
    _logger2.default.trace('identifying credit users and debit users');
    _lodash2.default.map(userExpenses, function (value, name) {
        if (value - perPersonShare > 0) {
            debitUsers.push({
                name: name,
                value: value - perPersonShare
            });
        } else if (value - perPersonShare < 0) {
            creditUsers.push({
                name: name,
                value: perPersonShare - value
            });
        }
    });
}

function settleExpenses() {
    _logger2.default.trace('settling expenses among users');
    var sortedCredit = _lodash2.default.sortBy(creditUsers, ['value']).reverse();
    _lodash2.default.forEach(sortedCredit, function (user) {
        while (user.value > 1 / Math.pow(10, roundingPrecision - 1)) {
            var bestFitValue = 0;
            var bestFitIndex = 0;
            for (var i = 0; i < debitUsers.length; i++) {
                if (Math.abs(user.value - debitUsers[i].value) < 1 / Math.pow(10, roundingPrecision)) {
                    bestFitValue = user.value;
                    bestFitIndex = i;
                    break;
                } else if (user.value > debitUsers[i].value && debitUsers[i].value > bestFitValue) {
                    bestFitValue = debitUsers[i].value;
                    bestFitIndex = i;
                } else if (user.value < debitUsers[i].value && (debitUsers[i].value < bestFitValue || bestFitValue == 0)) {
                    bestFitValue = user.value;
                    bestFitIndex = i;
                }
            }
            printSettlementTransactions(user.name, debitUsers[bestFitIndex].name, bestFitValue);
            user.value -= bestFitValue;
            debitUsers[bestFitIndex].value -= bestFitValue;
        }
    });
}

function splitExpenses(usersIn, transactionsIn) {
    if ((0, _inputValidator.inputValidator)(usersIn, transactionsIn)) {
        users = usersIn;
        transactions = transactionsIn;
        calculatePerPersonShare();
        identifyCreditAndDebit();
        settleExpenses();
        return true;
    } else {
        _logger2.default.error('user inputs failed input validation');
        return false;
    }
}

exports.default = splitExpenses;