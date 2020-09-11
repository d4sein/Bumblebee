import * as Discord from "discord.js"
import { cm, CommandParams } from "../../commands.config"
import { groupBy } from 'underscore'
import tl from '../../translator.config'

module.exports = {
  name: 'help',
  run: async (params: CommandParams): Promise<void> => {
    interface Fields {
      name: string,
      value: string
    }

    const server = params.ctx.guild!.id
    // Gets the name of the commands by category
    const categories = new Map(
      Object.entries(
        groupBy([...cm.commands.values()], (command) => {
          return tl.translate(`UI.${command.name}.attrs.category`, server)
        })
      )
    )
    
    const arrCategories = [...categories.keys()]
    let indexCategories = 0

    let embedFields: Fields[] = []

    function addToEmbedFields(): void {
      embedFields = []

      categories.get(arrCategories[indexCategories])
        ?.forEach(module => embedFields.push({
            name: module.name,
            value: tl.translate(`UI.${module.name}.attrs.description`, server)
          })
        )
    }

    addToEmbedFields()

    const reactionEmojis = {
      left: '⬅️',
      right: '➡️'
    }

    let embed = new Discord.MessageEmbed()
      .setTitle(arrCategories[indexCategories])
      .addFields(embedFields)
      .setColor(process.env.EMBED_COLOR!)
      .setTimestamp()
      .setFooter(`${indexCategories + 1}/${arrCategories.length}`)
    
    await params.ctx.channel.send(embed)
      .then(async msg => {
        await msg.react(reactionEmojis.left)
          .then(async () => await msg.react(reactionEmojis.right))
        
        const filter = (reaction: Discord.MessageReaction, user: Discord.User) => {
          return Object.values(reactionEmojis).includes(reaction.emoji.name)
          && user.id === params.ctx.author.id
        }

        const collector = msg.createReactionCollector(filter, { time: 60000 })

        collector.on('collect', async (reaction, user) => {
          await reaction.users.remove(user)

          if (reaction.emoji.name === reactionEmojis.left && indexCategories > 0) {
            indexCategories -= 1
          } else if (reaction.emoji.name === reactionEmojis.right
            && indexCategories < arrCategories.length - 1) {
            indexCategories += 1
          }

          addToEmbedFields()

          embed = new Discord.MessageEmbed()
            .setTitle(arrCategories[indexCategories])
            .addFields(embedFields)
            .setColor(process.env.EMBED_COLOR!)
            .setTimestamp()
            .setFooter(`${indexCategories + 1}/${arrCategories.length}`)
          
          msg.edit(embed)
        })
      })
      .catch(err => console.error(err))
  }
}
