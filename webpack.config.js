const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    libraryTarget: 'var',
    library: 'globalcounter'
  }
};


// module.exports = {
//   entry: './index.js',
//   output: {
//     path: './lib',
//     filename: 'yourlib.js',
//     libraryTarget: 'var',
//     library: 'EntryPoint'
//   }
// };
