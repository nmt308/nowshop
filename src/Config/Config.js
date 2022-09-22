import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyC8hhziuYldFdyGxjWO52vEC7sTVt2Ba7Q',
    authDomain: 'nowshop-e2ae1.firebaseapp.com',
    projectId: 'nowshop-e2ae1',
    storageBucket: 'nowshop-e2ae1.appspot.com',
    messagingSenderId: '802230638947',
    appId: '1:802230638947:web:35032485ee7d9ab66d9b56',
    measurementId: 'G-VZXZLXSJSE',
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const fs = getFirestore(app);
const storage = getStorage(app);

export { app, auth, fs, storage };
