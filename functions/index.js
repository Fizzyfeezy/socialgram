//'use strict';
const functions = require('firebase-functions');
const app = require('express')();
const {db} = require('./util/admin');
// const express = require('express');
// const app = express.Router();


const {getAllScreams,
        postOneScream,
        getScream,
        deleteScream,
        commentOnScream,
        likeScream,
        unlikeScream} = require('./handlers/screams');
const {signup,
        login,
        uploadImage,
        addUserDetails,
        getUserDetails,
        markNotificationsRead,
        getAuthenticatedUser} = require('./handlers/users');
const {FBAuth} = require('./util/fbAuth');


//Scream routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);
app.get('/scream/:screamId', getScream);
app.delete('/scream/:screamId', FBAuth, deleteScream);
app.post('/scream/:screamId/comment', FBAuth, commentOnScream);
app.get('/scream/:screamId/like', FBAuth, likeScream);
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream);

// Users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/notifications', FBAuth, markNotificationsRead);


exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions.firestore.document('likes/{id}')
    .onCreate((snapshot) => {
        db.doc(`/screams/${snapshot.data().screamId}`).get().then(doc => {
            if (doc.exists) {
                return db.doc( `/notifications/${snapshot.id}`).set({
                    createdAt : new Date().toISOString(),
                    recipent : doc.data().userHandle,
                    sender : snapshot.data().userHandle,
                    type : 'like',
                    read : false,
                    screamId : doc.id
                })
            }
        }).then(() => {
            return;
        }).catch(err => {
            console.error(err);
            return;
        })
    });

    exports.deleteNotificationOnUnLike = functions.firestore.document(`likes/{id}`)
        .onDelete(snapshot => {
            db.doc(`/notifications/${snapshot.id}`).delete().then(() => {
                return;
            }).catch(err => {
                console.error(err);
                return;
            })
        })

    exports.createNoficationOnComment = functions.firestore.document(`comments/{id}`)
        .onCreate(snapshot => {
            db.doc(`/screams/${snapshot.data().screamId}`).get().then(doc => {
                if (doc.exists) {
                    return db.doc( `/notifications/${snapshot.id}`).set({
                        createdAt : new Date().toISOString(),
                        recipent : doc.data().userHandle,
                        sender : snapshot.data().userHandle,
                        type : 'comment',
                        read : false,
                        screamId : doc.id
                    })
                }
            }).then(() => {
                return;
            }).catch(err => {
                console.error(err);
                return;
            })
        });

