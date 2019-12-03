'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./build/mgnl-react-renderer.min.js');
} else {
    module.exports = require('./build/mgnl-react-renderer.js');
}
