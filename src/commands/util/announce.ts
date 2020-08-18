import * as Discord from 'discord.js'
import { CommandParams } from '../../commands.config'
import { responses, errors } from '../../replies.config'

module.exports = {
  run: async (params: CommandParams): Promise<void> => {
    const channel = params.args.get('ch')
    if (!channel) {
      await params.ctx.channel.send(errors.badCommandConfig)
      return
    }

    if (typeof channel === 'boolean') {
      await params.ctx.channel.send(
        responses.fnIncorrectUsage(params.command.usage)
      )
      return
    }
    const newChannel: string | undefined = channel?.shift()?.replace(/\D/g, '')
    if (!newChannel) {
      await params.ctx.channel.send(
        responses.fnIncorrectUsage(params.command.usage)
      )
      return
    }

    const title = params.args.get('title')
    if (typeof title === 'boolean') {
      await params.ctx.channel.send(
        responses.fnIncorrectUsage(params.command.usage)
      )
      return
    }
    const newTitle: string | undefined = title?.join(' ')
    if (!newTitle) {
      await params.ctx.channel.send(errors.badCommandConfig)
      return
    }

    const desc = params.args.get('desc')
    if (typeof desc === 'boolean') {
      await params.ctx.channel.send(
        responses.fnIncorrectUsage(params.command.usage)
      )
      return
    }
    const newDesc: string | undefined = desc?.join(' ')
    if (!newDesc) {
      await params.ctx.channel.send(errors.badCommandConfig)
      return
    }

    const embed = new Discord.MessageEmbed()
      .setAuthor(params.client.user?.username,
        params.client.user?.avatarURL() ?? undefined)
      .setTitle(newTitle)
      .setDescription(newDesc)
      .setTimestamp()

    await params.client.channels
      .fetch(newChannel)
      .then(async ch => {
        if (!ch) {
          return await params.ctx.channel.send('The channel you gave me is useless.')
        }

        await (ch as Discord.TextChannel).send(embed)
      })
      .catch(async () => params.ctx.channel.send(errors.unexpected))
  },
  name: 'announce',
  description: 'Sends an announcement',
  usage: 'announce --ch <channel>! --title <title>! --desc <description>!',
  category: 'Moderation',
  parameters: new Map([
    ['positional', ['ch', 'title', 'desc']],
    ['optional', []],
    ['keyword', []]
  ])
}
