const { getStorage } = require('firebase-admin/storage');
const { cert, initializeApp } = require('firebase-admin/app');
// const serviceAccount = require('https://firebasestorage.googleapis.com/v0/b/fir-4fe9e.appspot.com/o/fir-4fe9e-firebase-adminsdk-k840a-c986bb049a.json?alt=media&token=e8009461-b2e5-481f-b917-cc490c5313aa')
const serviceAccount = {
  "type": process.env.TYPE,
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY,
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.token_uri,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
}

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.STORAGEBUCKET
});

const bucket = getStorage().bucket();

module.exports = { bucket };

