const activityChange = require('../../utils/activityChange')

module.exports = (client) => {
    console.log(`LOG: ${client.user.tag} is online!`);
    activityChange(client)
}