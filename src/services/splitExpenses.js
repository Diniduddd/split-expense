import _ from 'lodash';
import logger from '../utils/logger';
import {inputValidator} from './inputValidator';
import appConfig from '../../config/appConfig';

const roundingPrecision = appConfig.roundingPrecision;

let users;
let transactions;
let perPersonShare;
let userExpenses;
let creditUsers = [];
let debitUsers = [];

function calculatePerPersonShare() {
    logger.trace('calculating per person share');
    let userExpensesData = {};
    _.forEach(users, (user) => {userExpensesData[user] = 0});
    let userData = transactions.reduce((userData, ele) => {
        userData.total += ele.value;
        userData.groups[ele.name] += ele.value;
        return userData;
    }, {groups: userExpensesData, total: 0});
    
    perPersonShare = users.length > 0 ? _.round(userData.total/ users.length, roundingPrecision) : 0;
    userExpenses = userData.groups;
}

function printSettlementTransactions(payer, receiver, amount) {
    console.log(`${payer} pays $${_.round(amount, 2)} to ${receiver}`);
}

function identifyCreditAndDebit() {
    logger.trace('identifying credit users and debit users');
    _.map(userExpenses, (value, name) => {
        if(value - perPersonShare > 0) {
            debitUsers.push({
                name: name,
                value: value - perPersonShare
            });
        }
        else if(value - perPersonShare < 0) {
            creditUsers.push({
                name: name,
                value: perPersonShare - value
            });
        }
    })

}

function settleExpenses() {
    logger.trace('settling expenses among users');
    let sortedCredit = _.sortBy(creditUsers, ['value']).reverse();
    _.forEach(sortedCredit, (user) => {
        while(user.value > 1/(Math.pow(10, roundingPrecision - 1))){
            let bestFitValue = 0;
            let bestFitIndex = 0;
            for(let i = 0; i < debitUsers.length; i ++){
                if(Math.abs(user.value - debitUsers[i].value) < 1/(Math.pow(10, roundingPrecision))){
                    bestFitValue = user.value;
                    bestFitIndex = i;
                    break;
                }
                else if(user.value > debitUsers[i].value && debitUsers[i].value > bestFitValue) {
                    bestFitValue = debitUsers[i].value;
                    bestFitIndex = i;
                }
                else if(user.value < debitUsers[i].value && (debitUsers[i].value < bestFitValue || bestFitValue == 0)) {
                    bestFitValue = user.value;
                    bestFitIndex = i;
                }
            }
            printSettlementTransactions(user.name, debitUsers[bestFitIndex].name, bestFitValue);
            user.value -= bestFitValue;
            debitUsers[bestFitIndex].value -= bestFitValue; 
        }
    })
}

function splitExpenses (usersIn, transactionsIn) {  
    if(inputValidator(usersIn, transactionsIn)){
        users = usersIn;
        transactions = transactionsIn;
        calculatePerPersonShare();
        identifyCreditAndDebit();
        settleExpenses();
        return true;
    }
    else {
        logger.error('user inputs failed input validation');
        return false;
    }
}

export default splitExpenses;