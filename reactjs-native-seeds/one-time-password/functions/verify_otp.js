const admin = require('firebase-admin');

module.exports = function(req, res) {

    if (!req.body.phone || !req.body.code) {
        res.status(422).send({error: 'Phone and code must be provided'});
    }

    const phone = String(req.body.phone).replace(/[^\d]/g,"");
    const code = parseInt(req.body.code);

    admin.auth().getUser(phone)
    .then(() => {
        const ref = admin.database().ref('users/' + phone);
        ref.on('value' , snapshot => {
            ref.off();
            const user = snapshot.val();

            if(user.code !== code || !user.codeValid) {
                return res.status(422).send({error: 'Code not valid'});
            }

            //Marking the code as no longer valid
            ref.update({ codeValid: false });

            admin.auth().createCustomToken(phone)
            .then(token => {
                res.send({ token: token });
                return true;
            })
            .catch(err => {
                res.status(422).send({error: err});
            });

        });

        return true;

    })
    .catch(err => {
        res.status(422).send({error: err});
    });

}