const path = require('path');
const buildPaths = {
   buildPathHtml: path.resolve(`./transactions/statement.html`),
   buildPathPdf: path.resolve(`./services/pdf/statement.pdf`)
};

module.exports = buildPaths;