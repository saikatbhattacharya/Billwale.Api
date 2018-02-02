const configFilePath = process.env.NODE_ENV?'./config.'+process.env.NODE_ENV+'.js':'./config.development.js';
const config = require(configFilePath);

export default config;
