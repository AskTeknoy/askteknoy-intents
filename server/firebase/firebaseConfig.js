const { initializeApp } = require("firebase/app"); 
const { getStorage } = require("firebase/storage"); 

const firebaseConfig = {
  apiKey: "AIzaSyBy40RfZXfC-ZR08zKLzGwHJY-5n00v71k",
  authDomain: "askteknoy-storage.firebaseapp.com",
  projectId: "askteknoy-storage",
  storageBucket: "askteknoy-storage.appspot.com",
  messagingSenderId: "320897375085",
  appId: "1:320897375085:web:5561481d3432772d401864"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app, firebaseConfig.storageBucket);

module.exports = { storage };

