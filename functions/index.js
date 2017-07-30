const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const userid = req.query.u;
  const roomid = req.query.r;
  const msg = req.query.m;

  const timestamp = admin.database.ServerValue.TIMESTAMP;

  admin.database().ref('/users').child(userid).child('username')
    .on("value", function(snapshot) { 
      const user = snapshot.val();
      admin.database().ref('/chatrooms').child(roomid).child('/messages')
        .push({username: user, message: msg, time: timestamp });
      res.status(200).end();
     });
  
});

