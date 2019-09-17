//'use strict';
const functions = require('firebase-functions');
const app = require('express')();
// const express = require('express');
// const app = express.Router();


const {getAllScreams, postOneScream} = require('./handlers/screams');
const {signup, login, uploadImage, addUserDetails} = require('./handlers/users');
const {FBAuth} = require('./util/fbAuth');


//Scream routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);

// Users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);


exports.api = functions.https.onRequest(app);