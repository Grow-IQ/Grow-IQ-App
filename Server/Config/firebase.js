import './loadenv.js';
import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const Authdb = admin.firestore();
const auth = admin.auth();

export { admin, Authdb, auth };