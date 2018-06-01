import Rebase from 're-base';
import firebase from 'firebase';

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCTwaEbJ_RZqo8wccbHJfqW3ng2hMHXWvE",
    authDomain: "catch-of-the-day-2018-45a36.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-2018-45a36.firebaseio.com",
    projectId: "catch-of-the-day-2018-45a36",
    storageBucket: "catch-of-the-day-2018-45a36.appspot.com",
    messagingSenderId: "732570179405"
});

const rebase = Rebase.createClass(firebaseApp.database());

export default rebase;
