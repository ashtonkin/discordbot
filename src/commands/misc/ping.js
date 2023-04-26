const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with the bot ping!"),

  run: async ({client, interaction}) => {
    await interaction.deferReply();
    const reply = await interaction.fetchReply();
    const ping = reply.createdTimestamp - interaction.createdTimestamp;
    await interaction.editReply(`Client: ${ping}ms | Websocket: ${client.ws.ping}ms`);
  }

};