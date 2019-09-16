const {db} = require('../util/admin');

//get all scream
exports.getAllScreams = (request, response) => {
    db.collection('screams')
    .orderBy('createdAt', 'desc').get()
    .then(data => {
        let screams = [];
        data.forEach(doc => {
            screams.push({
                screamId : doc.id,
                userHandle : doc.data().userHandle,
                body : doc.data().body,
                createdAt : doc.data().createdAt
            });
        })
        return response.json(screams)
    })
    .catch(err => {
        console.error(err);
    })
}

// Add one scream
exports.postOneScream = (request, response) => {
    if (request.body.body.trim() === '') {
        return response.status(400).json({body : 'Body must not be empty'});
    }
    const newStream = {
        body : request.body.body,
        userHandle : request.user.handle,
        createdAt : new Date().toISOString()
        //createdAt : admin.firestore.Timestamp.fromDate(new Date())
    };

    db.collection('screams').add(newStream)
    .then(doc => {
        response.json(`document ${doc.id} created successfully`);
    })
    .catch(err => {
        response.status(500).json({ error : 'something went wrong'});
        console.error(err);
    })
}