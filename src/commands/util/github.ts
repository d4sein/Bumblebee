import * as Discord from 'discord.js'
import { CommandParams } from '../../commands.config'

module.exports = {
  run: async (params: CommandParams): Promise<void> => {
    const embed = new Discord.MessageEmbed()
      .setDescription(process.env.GITHUB)
      .setColor(process.env.EMBED_COLOR ?? 'DEFAULT')

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
