const { TextInputBuilder, TextInputStyle, Events, EmbedBuilder, ActionRowBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionsBitField, ModalBuilder } = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
  .setName('templates')
  .setDescription('Ceci est une commande template')
  .setDMPermission(false),
  async execute(interaction) {

    const finalembeds = [new EmbedBuilder().setDescription("Description lol").setTitle("embed nameawd")];
   interaction.reply({ content: "wad", embeds: [finalembeds], ephemeral: true })

  }
}