// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDj-HOS9wZ5EqtuRjn8D6aT6AGMvmbCL-Q",
    authDomain: "my-task-manager-f6e75.firebaseapp.com",
    projectId: "my-task-manager-f6e75",
    storageBucket: "my-task-manager-f6e75.appspot.com",
    messagingSenderId: "1039814255916",
    appId: "1:1039814255916:web:975618176a90c9b373b889"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;