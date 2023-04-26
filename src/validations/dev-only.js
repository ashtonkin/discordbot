require('dotenv').config();
module.exports = (interaction, commandObj, handler, client) => {
  if (commandObj.devOnly && interaction.member.id !== process.env.OWNERS_ID) {
    interaction.reply('This command is for developers only!');
    return true;
  }
}