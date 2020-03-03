'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./build/mgnl-react-editor.min.js');
} else {
    module.exports = require('./build/mgnl-react-editor.js');
}
