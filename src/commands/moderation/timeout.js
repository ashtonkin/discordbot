const {PermissionFlagsBits, SlashCommandBuilder} = require('discord.js');
const ms = require('ms');
const devOnly = require('../../validations/dev-only');

module.exports = {

  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout a user")
    .addMentionableOption((option) =>
      option
        .setName("target")
        .setDescription("The user you want to timeout")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription("Timeout duration eg.(5s, 1m, 3h, 4d)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the timeout")
    ),

  run: async ({interaction}) => {
    const mentionable = interaction.options.get("target").value;
    const duration = interaction.options.get("duration").value;
    const reason = interaction.options.get("reason")?.value || "No reason provided.";

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(mentionable);

    if (!targetUser) {
      await interaction.editReply("That user does not exist in this server!");
      return;
    }

    if (targetUser.id === interaction.guild.members.me.id) {
      await interaction.editReply("Well this is a little awkward, trying to timeout myself!");
      return;
    }

    if (targetUser.user.bot) {
      await interaction.editReply("I cannot timeout another bot!");
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply("You cannot timeout the server owner!");
      return;
    }

    const durationTime = ms(duration);
    if (isNaN(durationTime)) {
      await interaction.editReply("Please provide a valid timeout duration!");
      return;
    }

    if (durationTime < 5000 || durationTime > 2.419e9) {
      await interaction.editReply("Timeout duration cannot be less then 5 seconds or more then 28 days!");
      return;
    }

    const usersUserRolePosition = interaction.member.roles.highest.position; //User who ran the command
    const targetUserRolePosition = targetUser.roles.highest.position; //Target user
    const botRolePosition = interaction.guild.members.me.roles.highest.position; //Bot Role Position

    if (usersUserRolePosition >= targetUserRolePosition || usersUserRolePosition >= botRolePosition) {
      await interaction.editReply("You cannot timeout someone with an equal or higher role then yourself/myself!")
      return;
    }

    try {
      const {default: prettyms} = await import("pretty-ms");

      if (targetUser.isCommunicationDisabled()) {
        await targetUser.timeout(durationTime, reason);
        await interaction.editReply(`${targetUser}'s timeout has been updated to ${prettyms(durationTime, {
          verbose: true,
        })}\nReason: ${reason}`);
        return;
      }
      await targetUser.timeout(durationTime, reason);
      await interaction.editReply(`${targetUser} was timed out for ${prettyms(durationTime, {
        verbose: true,
      })}\nReason: ${reason}`);
    } catch (error) {
      console.log(`ERROR: Timing out: ${error}`)
    }
  },
  permissionsRequired: [PermissionFlagsBits.MuteMembers],
  botPermission: [PermissionFlagsBits.MuteMembers],
  devOnly,
}