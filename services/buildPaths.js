const path = require('path');
const buildPaths = {
   buildPathHtml: path.resolve('./transactions/build.html'),
   buildPathPdf: path.resolve('./pdf/build.pdf')
};

module.exports = buildPaths;