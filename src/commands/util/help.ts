import * as Discord from "discord.js"
import { commands, CommandParams } from "../../commands.config"

module.exports = {
  run: async (params: CommandParams): Promise<void> => {
    interface Fields {
      name: string,
      value: string
    }

    const embedFields: Fields[] = []

    commands.forEach(module => {
      embedFields.push({
        name: module.name,
        value: module.description
      })
    })

    const embedColor: string = process.env.EMBED_COLOR ?? 'DEFAULT'

    const embed = new Discord.MessageEmbed()
      .setTitle('LIST OF COMMANDS')
      .addFields(embedFields)
      .setColor(embedColor)
      .setTimestamp()

    params.ctx.channel.send(embed)
  },
  name: 'help',
  description: 'Shows the list of commands',
  usage: 'help',
  category: 'Util',
    parameters: new Map([
    ['positional', []],
    ['optional', []],
    ['keyword', []]
  ])
}
