const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const Busboy = require('busboy');
const os = require('os');
const path = require('path');
const fs = require('fs');
const fbAdmin = require('firebase-admin');
const uuid = require('uuid/v4');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const gcconfig = {
    projectId: 'flutter-course-7d0aa',
    keyFilename: 'flutter-course-7d0aa-firebase-adminsdk-tanvc-2b7e03d730'
};
// const gcs = require('@google-cloud/storage')(gcconfig);

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const gcs = new Storage(gcconfig);

fbAdmin.initializeApp({
    credential: fbAdmin.credential.cert(require('./flutter-course-7d0aa-firebase-adminsdk-tanvc-2b7e03d730.json'))
});

exports.storeImage = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(500).json({ message: 'Not allowed.' });
        }

        // Check Bearer token is coming
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized.' });
        }

        // Grab the token
        let idToken;
        idToken = req.headers.authorization.split('Bearer ')[1];

        const busboy = new Busboy({
            headers: req.headers
        });
        let uploadData;
        let oldImagePath;

        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            // Build the destination path fopr temporary storage 
            const filePath = path.join(os.tmpdir(), filename);

            uploadData = {
                filePath: filePath,
                type: mimetype,
                name: filename
            };

            file.pipe(fs.createWriteStream(filePath));
        });

        busboy.on('field', (fieldname, value) => {
            oldImagePath = decodeURIComponent(value);
        });

        busboy.on('finish', () => {

            const bucket = gcs.bucket('flutter-course-7d0aa.appspot.com');
            const id = uuid();
            let imagePath = 'images/' + id + '-' + uploadData.name;

            if (oldImagePath) {
                imagePath = oldImagePath;
            }

            return fbAdmin.auth().verifyIdToken(idToken)
                .then((decodedToken) => {
                    return bucket.upload(uploadData.filePath, {
                        uploadType: 'media',
                        destination: imagePath,
                        metadata: {
                            metadata: {
                                contentType: uploadData.type,
                                firebaseStorageDownloadTokens: id
                            }
                        }
                    })
                })
                .then(() => {
                    return res.status(401).json({
                        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' + bucket.name + '/o/' + encodeURIComponent(imagePath) + '?alt=media&token=' + id,
                        imagePath: imagePath
                    });
                })
                .catch(error => {
                    return res.status(401).json({ error: 'Unauthorized.' + JSON.stringify(error) });
                });

        });

        return busboy.end(req.rawBody);
    });
});
