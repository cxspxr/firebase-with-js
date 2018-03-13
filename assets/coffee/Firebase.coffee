config =
    apiKey: process.env.DB_KEY
    authDomain: process.env.DB_DOMAIN
    databaseURL: process.env.DB_URL
    projectId: process.env.DB_ID
    storageBucket: process.env.DB_BUCKET
    messagingSenderId: process.env.DB_SENDER

firebase.initializeApp config
