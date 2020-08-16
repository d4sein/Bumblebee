import * as Discord from 'discord.js'
import { CommandParams } from '../../commands.config'
import { responses } from '../../replies.config'

module.exports = {
  run: async (params: CommandParams): Promise<void> => {
    let channel = params.args.get('ch')
    if (typeof channel === 'boolean') {
      await params.ctx.channel.send(
        responses.fnValueIsNotKeyword('<channel>!', params.command.usage)
      )
      return
    }
    const v_channel: string = channel?.shift()?.replace(/\D/g, '')!

    let title = params.args.get('title')
    if (typeof title === 'boolean') {
      await params.ctx.channel.send(
        responses.fnValueIsNotKeyword('<title>!', params.command.usage)
      )
      return
    }
    const v_title: string = title?.join(' ')!

    let desc = params.args.get('desc')
    if (typeof desc === 'boolean') {
      await params.ctx.channel.send(
        responses.fnValueIsNotKeyword('<description>!', params.command.usage)
      )
      return
    }
    const v_desc: string = desc?.join(' ')!

    const embed = new Discord.MessageEmbed()
      .setTitle(v_title)
      .setDescription(v_desc)

    const announce_channel = await params.client.channels
      .fetch(v_channel)
      .catch(async err => {
        await params.ctx.channel.send(`The channel you gave me is useless.`)
      })
      .then(ch => {
        if (!ch) return
        (ch as Discord.TextChannel).send(embed)
      })
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
