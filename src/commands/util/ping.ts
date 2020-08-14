import * as Discord from 'discord.js'

module.exports = {
  run: async (ctx: Discord.Message): Promise<void> => {
    const embed = new Discord.MessageEmbed()
      .setDescription('Pinging..')

    ctx.channel.send(embed)
      .then(msg => {
        const latency = msg.createdTimestamp - ctx.createdTimestamp
        
        embed
          .setDescription(latency + 'ms')

        msg.edit(embed)
      })
  },
  name: 'ping',
  description: 'Shows the bot\'s latency',
  usage: 'ping',
  category: 'Util'
}
