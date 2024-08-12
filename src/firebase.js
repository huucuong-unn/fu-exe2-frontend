// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyD6WWZG8KrQH6vfiz8vN3NH14bX6gQSpu8',
    authDomain: 'tortee-60675.firebaseapp.com',
    projectId: 'tortee-60675',
    storageBucket: 'tortee-60675.appspot.com',
    messagingSenderId: '315384652986',
    appId: '1:315384652986:web:9351f9a335beb7ed39ce83',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission);
    if (permission === 'granted') {
        const token = await getToken(messaging, {
            vapidKey: 'BHqpq9OF81XDSLS_sLQo0ZAiLONtj6Qj5CaJ7W0kPIUtzAv4HRZrR3dJEWvEsBdb_bFfLaFnViGaHpz-xFlZ880',
        });
        console.log(token);
    }
};
