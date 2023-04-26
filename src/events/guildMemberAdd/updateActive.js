const activityChange = require('../../utils/activityChange')

module.exports = (event, client) => {
  activityChange(client)
}