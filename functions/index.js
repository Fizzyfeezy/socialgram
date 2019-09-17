//'use strict';
const functions = require('firebase-functions');
const app = require('express')();
// const express = require('express');
// const app = express.Router();


const {getAllScreams, postOneScream, getScream} = require('./handlers/screams');
const {signup, login, uploadImage, addUserDetails, getAuthenticatedUser} = require('./handlers/users');
const {FBAuth} = require('./util/fbAuth');


//Scream routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);
app.get('/scream/:screamId', getScream);

// Users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);


exports.api = functions.https.onRequest(app);