'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./build/mgnl-service.min.js');
} else {
    module.exports = require('./build/mgnl-service.js');
}
