function LoggerService() {
    return {
        log,
        info,
        warn,
        error
    };

    function log(message, ...optionalParams) {
        exec('log', message, optionalParams);
    }

    function info(message, ...optionalParams) {
        exec('info', message, optionalParams);
    }

    function warn(message, ...optionalParams) {
        exec('warn', message, optionalParams);
    }

    function error(message, ...optionalParams) {
        exec('error', message, optionalParams);
    }

    function exec(fnName = 'log', message, ...optionalParams) {
        if (typeof console === 'undefined') {
            return;
        }
        // eslint-disable-next-line no-console
        console[fnName](message, optionalParams);
    }
}

export default LoggerService();
