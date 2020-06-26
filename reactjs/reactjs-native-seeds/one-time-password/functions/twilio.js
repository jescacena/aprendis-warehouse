const twilio = require ("twilio");

const accountSid = "XXX";
const accountToken = "XXX";

module.exports = new twilio.Twilio(accountSid, accountToken);
