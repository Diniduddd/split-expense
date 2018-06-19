import fs from 'fs';
import logger from './logger';

function fileReader (filePath) {
    try{
        logger.trace(`opening the file in ${filePath}`);
        return fs.readFileSync(filePath, "utf8");
    }
    catch(e){
        logger.debug(e);
        logger.error(`can not find the file specified by the path ${filePath}`);
        throw new Error(`can not find the file specified by the path ${filePath}`);
    }
}

export default fileReader;