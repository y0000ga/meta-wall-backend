import dotenv from 'dotenv';
import firebaseAdmin from 'firebase-admin'; // Node.js 透過 Firebase-admin 去找到那個專案，作為中間橋梁

const admin = firebaseAdmin;

// 初始化 firebase storage
// 因為不是每個 router 都需要 firebase 服務，所以把這個邏輯特別抽出來
dotenv.config();

const config = {
  type: process.env.FIREBASE_TYPE,
  projectId: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_X509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(config),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
});

export default admin;
