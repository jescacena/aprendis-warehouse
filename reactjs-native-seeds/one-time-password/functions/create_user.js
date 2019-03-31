const admin = require('firebase-admin');

module.exports = function (req, res) {
    //Verify the user enters a phone
    if (!req.body.phone) {
        return res.status(422).send({ error: 'Bad input' });
    }

    //Format the number to remove dashes and parents
    const phone = String(req.body.phone).replace(/[^\d]/g, "");

    //Create a new user account using that phone number
    //Respond to the user request , saying that account was made
    admin.auth().createUser({ uid: phone })
        .then(user => res.send(user))
        .catch(err => res.status(422).send({ error: err }));
}
