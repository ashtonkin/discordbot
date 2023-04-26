require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js');
const {CommandHandler} = require('djs-commander');
const path = require('path');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessages,
  ],
});

new CommandHandler({
  client,
  commandsPath: path.join(__dirname, 'commands'),
  eventsPath: path.join(__dirname, 'events'),
  validationsPath: path.join(__dirname, 'validations'),
  testServer: process.env.GUILD_ID
})

client.login(process.env.TOKEN);

/**
 *  GUILDS (1 << 0)
 *  *   - GUILD_CREATE
 *  *   - GUILD_UPDATE
 *  *   - GUILD_DELETE
 *  *   - GUILD_ROLE_CREATE
 *  *   - GUILD_ROLE_UPDATE
 *  *   - GUILD_ROLE_DELETE
 *  *   - CHANNEL_CREATE
 *  *   - CHANNEL_UPDATE
 *  *   - CHANNEL_DELETE
 *  *   - CHANNEL_PINS_UPDATE
 *  *   - THREAD_CREATE
 *  *   - THREAD_UPDATE
 *  *   - THREAD_DELETE
 *  *   - THREAD_LIST_SYNC
 *  *   - THREAD_MEMBER_UPDATE
 *  *   - THREAD_MEMBERS_UPDATE *
 *  *   - STAGE_INSTANCE_CREATE
 *  *   - STAGE_INSTANCE_UPDATE
 *  *   - STAGE_INSTANCE_DELETE
 *  GUILD_MEMBERS (1 << 1) **
 *  *   - GUILD_MEMBER_ADD
 *  *   - GUILD_MEMBER_UPDATE
 *  *   - GUILD_MEMBER_REMOVE
 *  *   - THREAD_MEMBERS_UPDATE *
 *  GUILD_MESSAGES (1 << 9)
 *  *   - MESSAGE_CREATE
 *  *   - MESSAGE_UPDATE
 *  *   - MESSAGE_DELETE
 *  *   - MESSAGE_DELETE_BULK
 *  MESSAGE_CONTENT (1 << 15) ***
 *  *** MESSAGE_CONTENT does not represent individual events, but rather affects what data is present for events that could contain message content fields.
 *  * More information is in the message content intent section.
 */
