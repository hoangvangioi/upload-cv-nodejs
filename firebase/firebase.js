'use strict';
const { getStorage } = require('firebase-admin/storage');
const { initializeApp, cert } = require('firebase-admin/app');
const serviceAccount = require('./fir-4fe9e-firebase-adminsdk-k840a-c986bb049a.json')

const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.STORAGEBUCKET
});

const bucket = getStorage().bucket();

module.exports = { bucket };

