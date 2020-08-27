import * as Discord from 'discord.js'
import { CommandParams } from '../../commands.config'
import { typeguards } from '../../typeguards.config'

module.exports = {
  run: async (params: CommandParams): Promise<void> => {
    console.log(params.args)
    const channel = typeguards.isString('ch', params).replace(/\D/g, '')
    const title = typeguards.isArrayStrings('title', params).join(' ')
    const desc = typeguards.isArrayStrings('desc', params).join(' ')

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
  },
  name: 'say',
  description: 'Sends a message',
  usage: 'say --ch <channel>! --title <title>! --desc <description>!',
  category: 'Moderation'
}
