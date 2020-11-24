const { BlobServiceClient } = require('@azure/storage-blob');
const { StorageSharedKeyCredential } = require('@azure/storage-blob');
const { DefaultAzureCredential } = require('@azure/identity');

// eslint-disable-next-line no-unused-vars
const defaultAzureCredential = new DefaultAzureCredential();
const sharedKeyCredential = new StorageSharedKeyCredential(
  process.env.AZURE_ACCOUNT,
  process.env.AZURE_KEY,
);

module.exports.deleteBlob = async (blobPath) => {
  // eslint-disable-next-line max-len
  const blobService = new BlobServiceClient(process.env.AZURE_CONTAINER_PATH, sharedKeyCredential);
  const containerClient = blobService.getContainerClient(process.env.AZURE_CONTAINER_NAME);
  await containerClient.deleteBlob(blobPath);
};
