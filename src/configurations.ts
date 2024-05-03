import "dotenv/config";

require("dotenv").config();

const configurations = {
  baseApiUrl: "http://localhost:9067",
  baseWebSocketUrl: "http://localhost:9068",
  firebaseConfig: {
    apiKey: "AIzaSyCIVlZbKSnEUroxWiv0HJdN3kY_2uvrxV0",
    authDomain: "chat-java-85cda.firebaseapp.com",
    projectId: "chat-java-85cda",
    storageBucket: "chat-java-85cda.appspot.com",
    messagingSenderId: "215387889820",
    appId: "1:215387889820:web:bad274d3079b97b2ed4d59",
  },
};

export default configurations;
