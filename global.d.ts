declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB: string;
      JWT_SECRET: string;
      NODE_ENV: 'dev' | 'production';
      JWT_EXPIRES_DAY: string;
      FIREBASE_PRIVATE_KEY_ID: string;
      FIREBASE_PRIVATE_KEY: string;
      FIREBASE_TYPE: string;
      FIREBASE_PROJECT_ID: string;
      FIREBASE_CLIENT_EMAIL: string;
      FIREBASE_CLIENT_ID: string;
      FIREBASE_AUTH_URI: string;
      FIREBASE_TOKEN_URI: string;
      FIREBASE_AUTH_PROVIDER_X509_CERT_URL: string;
      FIREBASE_CLIENT_X509_CERT_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_CALLBACK_URL: string;
      THIRD_PARTY_PASSWORD_SECRET: string;
    }
  }
}

export {};
