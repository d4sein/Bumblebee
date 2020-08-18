import * as Discord from "discord.js"
import { errors } from '../../replies.config'
import { commands, CommandParams, Command } from "../../commands.config"
import { groupBy } from 'underscore'

module.exports = {
  run: async (params: CommandParams): Promise<void> => {
    interface Fields {
      name: string,
      value: string
    }

    const categories = new Map(
      Object.entries(
        groupBy([...commands.keys()], (command): string => {
          const module = commands.get(command)!
          return module.category
        })
      )
    )
    
    const newCategories: Map<string, Command[]> = Array.from(categories.keys())
      .map(category => {
        const arrCommands = categories.get(category)!
        return [category, ...arrCommands.map(command => commands.get(command))]
    })
    .reduce((acc, [key, ...values]) => acc
      .set(key, values), new Map)

    const arrCategories = [...newCategories.keys()]
    let indexCategories = 0 

    let embedFields: Fields[] = []

    function addToEmbedFields (): void {
      embedFields = []

      newCategories.get(arrCategories[indexCategories])
        ?.forEach(module =>{
          embedFields.push({
            name: module.name,
            value: module.description
          })
        })
    }

    addToEmbedFields()

    const reactionEmojis = {
      left: '⬅️',
      right: '➡️'
    }

    let embed = new Discord.MessageEmbed()
      .setTitle(arrCategories[indexCategories])
      .addFields(embedFields)
      .setColor(process.env.EMBED_COLOR ?? 'DEFAULT')
      .setTimestamp()
    
    await params.ctx.channel.send(embed)
      .then(async msg => {
        await msg.react(reactionEmojis.left)
          .then(async () => await msg.react(reactionEmojis.right))
        
        const filter = (reaction: Discord.MessageReaction, user: Discord.User) => {
          return Object.values(reactionEmojis).includes(reaction.emoji.name)
          && user.id === params.ctx.author.id
        }

        const collector = msg.createReactionCollector(filter, { time: 20000 })

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
            .setTimestamp()
          
          msg.edit(embed)
        })
      })
      .catch(async () => await params.ctx.channel.send(errors.unexpected))
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
