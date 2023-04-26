const {ActivityType} = require('discord.js')

module.exports = (client) => {
  const pluralize = (count, noun, suffix = "s") =>
    `${count} ${noun}${count > 1 ? suffix : ""}`;

  client.user.setActivity({
    type: ActivityType.Watching,
    name: pluralize(
      `${client.guilds.cache.reduce(
        (acc, guild) => acc + guild.memberCount,
        0)}`,
      " Member"),
  })
}