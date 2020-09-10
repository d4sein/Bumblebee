import * as Discord from 'discord.js'
import { CommandParams } from '../../commands.config'

module.exports = {
  name: 'ping',
  run: async (params: CommandParams): Promise<void> => {
    const embed = new Discord.MessageEmbed()
      .setDescription('Pinging..')
      .setColor(process.env.EMBED_COLOR!)

    params.ctx.channel.send(embed).then(async msg => {
        const latency = msg.createdTimestamp - params.ctx.createdTimestamp
        
        embed.setDescription(latency + 'ms')

        await msg.edit(embed)
      })
  }
}
