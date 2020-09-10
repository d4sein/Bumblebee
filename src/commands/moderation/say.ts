import * as Discord from 'discord.js'
import { CommandParams } from '../../commands.config'
import { typeguards } from '../../typeguards.config'

module.exports = {
  name: 'say',
  run: async (params: CommandParams): Promise<void> => {
    if (!params.ctx.member!.hasPermission('MANAGE_MESSAGES')) {
      return
    }

    const title = typeguards.isArrayStrings('title', params).join(' ')
    const desc = typeguards.isArrayStrings('desc', params).join(' ')

    let channel = typeguards.isOptString('ch', params) ?? params.ctx.channel.id
    if (channel) channel = channel.replace(/\D/g, '')

    const embed = new Discord.MessageEmbed()
      .setTitle(title)
      .setDescription(desc)
      .setColor(process.env.EMBED_COLOR!)
      .setTimestamp()
    
    await params.client.channels
      .fetch(channel)
      .then(async ch => {
        await (ch as Discord.TextChannel).send(embed)
      })
      .catch(console.error)
  }
}
