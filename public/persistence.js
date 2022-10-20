
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB6xgxqhBHdLcJXfPUus5KZotLSPl3Yd2U",
    authDomain: "perfectionist-english-app.firebaseapp.com",
    databaseURL: "https://perfectionist-english-app-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "perfectionist-english-app",
    storageBucket: "perfectionist-english-app.appspot.com",
    messagingSenderId: "834998132835",
    appId: "1:834998132835:web:cd08dafef44507504e1856",
    measurementId: "G-55WW6NPPQ8"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);
window.persistence = {};

window.persistence.getAllData = function (successCallback, errorCallback) {
    get(child(dbRef, `availablities`)).then((snapshot) => {
        if (snapshot.exists()) {
            successCallback(snapshot.val());
        }
    }).catch((error) => {
        errorCallback(error)
    });
}

window.persistence.getUserData = function (username, successCallback, errorCallback) {
    get(child(dbRef, `availablities/${username}`)).then((snapshot) => {
        if (snapshot.exists()) {
            successCallback(snapshot.val());
        }
    }).catch((error) => {
        errorCallback(error)
    });
}

window.persistence.checkUserName = function (username, callback) {
    get(child(dbRef, `availablities/${username}`)).then((snapshot) => {
        if (snapshot.exists()) {
            callback(false);
        } else {
            callback(true);
        }

    }).catch((error) => {
        callback(true, error)
    });
}

window.persistence.insertResponse = function (username, response, successCallback, errorCallback) {
    localStorage.setItem('username', username);
    set(ref(database, 'availablities/' + username), {
        response: response,
        total_update: 0,
        last_update: new Date().toISOString()
    }).then(() => {
        successCallback();
    }).catch(e => {
        errorCallback(e);
    });
}

window.persistence.updateResponse = function (username, response, successCallback, errorCallback) {
    localStorage.setItem('username', username);
    set(ref(database, 'availablities/' + username), {
        response: response,
        total_update: window.userData.total_update + 1,
        last_update: new Date().toISOString()
    }).then(() => {
        successCallback();
    }).catch(e => {
        errorCallback(e);
    });
}