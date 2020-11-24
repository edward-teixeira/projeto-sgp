const multer = require('multer');
// eslint-disable-next-line prefer-destructuring
const { MulterAzureStorage } = require('multer-azure-blob-storage');


const azureStorage = new MulterAzureStorage({
  connectionString: 'DefaultEndpointsProtocol=https;AccountName=projectaln;AccountKey=vne8USspMvj/86mZxjoA1gnPimhroSWKXoojvZDZ/7WECiMBrKsCrnE2BCq5RyRMOrUJYpeO6n/xarsfmpFbBg==;EndpointSuffix=core.windows.net',
  accessKey: 'vne8USspMvj/86mZxjoA1gnPimhroSWKXoojvZDZ/7WECiMBrKsCrnE2BCq5RyRMOrUJYpeO6n/xarsfmpFbBg==',
  accountName: 'projectaln',
  containerName: 'documentos-pdf',
  containerAccessLevel: 'blob',
  urlExpirationTime: 60,
});

module.exports.uploadAzure = multer({
  storage: azureStorage,

});
