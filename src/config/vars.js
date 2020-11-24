const { config } = require('bluebird');
const path = require('path');
const env = require('dotenv-safe');

// import .env variables
env.load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri: process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
  },
  azureConfig: {
    azureKey: process.env.AZURE_KEY,
    azureContainerPath: process.env.AZURE_CONTAINER_PATH,
    azureContainerName: process.env.AZURE_CONTAINER_NAME,
    azureAccount: process.env.AZURE_ACCOUNT,
    azureContainerConnString: process.env.CONTAINER_CONSTRING,
  },
};
