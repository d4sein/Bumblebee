import * as Discord from 'discord.js'
import { CommandParams } from '../../commands.config'

module.exports = {
  run: async (params: CommandParams): Promise<void> => {
    const embed = new Discord.MessageEmbed()
      .setDescription(`[Here's my github repo](${process.env.GITHUB})`)
      .setColor(process.env.EMBED_COLOR ?? 'DEFAULT')
      .setTimestamp()

    await params.ctx.channel.send(embed)
  },
  name: 'github',
  description: 'Sends the link to my github',
  usage: 'github',
  category: 'Util',
    parameters: new Map([
    ['positional', []],
    ['optional', []],
    ['keyword', []]
  ])
}
