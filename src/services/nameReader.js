import fileReader from '../utils/fileReader';
import {filePathValidator} from './inputValidator';
import logger from '../utils/logger';

function nameReader (filePath) {
    if(!filePathValidator(filePath)) {
        logger.error(`${filePath} input file path is not valid`);
        throw new Error(`${filePath} input file path is not valid`);
    }
    const nameString = fileReader(filePath);
    const  userNames = nameString.split(/\r?\n/);
    logger.trace('finish reading user name data');
    return userNames;
}

export default nameReader;