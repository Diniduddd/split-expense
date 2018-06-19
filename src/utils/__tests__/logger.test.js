import logger from '../logger';
import RandExp from 'randexp';

test('should call trace function of library', () => {
     const  spy = jest.spyOn(logger, 'trace');
    logger.trace(new RandExp(/[a-z]{5}/).gen());
    expect(spy).toHaveBeenCalled();

});
test('should call debug function of library', () => {
    const  spy = jest.spyOn(logger, 'debug');
    logger.debug(new RandExp(/[a-z]{5}/).gen());
    expect(spy).toHaveBeenCalled();

});

test('should call info function of library', () => {
    const  spy = jest.spyOn(logger, 'info');
    logger.info(new RandExp(/[a-z]{5}/).gen());
    expect(spy).toHaveBeenCalled();

});

test('should call warn function of library', () => {
    const  spy = jest.spyOn(logger, 'warn');
    logger.warn(new RandExp(/[a-z]{5}/).gen());
    expect(spy).toHaveBeenCalled();

});

test('should call error function of library', () => {
    const  spy = jest.spyOn(logger, 'error');
    logger.error(new RandExp(/[a-z]{5}/).gen());
    expect(spy).toHaveBeenCalled();

});

test('should call fatal function of library', () => {
    const  spy = jest.spyOn(logger, 'fatal');
    logger.fatal(new RandExp(/[a-z]{5}/).gen());
    expect(spy).toHaveBeenCalled();

});
