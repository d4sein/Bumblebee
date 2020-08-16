import * as Discord from 'discord.js'
import { Command } from '../../commands.config'
import { responses } from '../../replies.config'

module.exports = {
  run: async ({client, command, ctx, args}: {
    client: Discord.Client,
    ctx: Discord.Message,
    command: Command,
    args: Map<string, string[] | boolean>
  }): Promise<void> => {
    let channel = args.get('ch')
    if (typeof channel === 'boolean') {
      await ctx.channel.send(
        responses.fn_value_is_not_keyword('<channel>!', command.usage)
      )
      return
    }
    const v_channel = channel?.shift()?.replace(/\D/g, '')!

    let title = args.get('title')
    if (typeof title === 'boolean') {
      await ctx.channel.send(
        responses.fn_value_is_not_keyword('<title>!', command.usage)
      )
      return
    }
    const v_title: string = title?.join(' ')!

    let desc = args.get('desc')
    if (typeof desc === 'boolean') {
      await ctx.channel.send(
        responses.fn_value_is_not_keyword('<description>!', command.usage)
      )
      return
    }
    const v_desc: string = desc?.join(' ')!

    const embed = new Discord.MessageEmbed()
      .setTitle(v_title)
      .setDescription(v_desc)

    const announce_channel = client.channels.fetch(v_channel)
    if (!announce_channel) {
      // await ctx.channel.send...
      return
    }

    await announce_channel
      .then(ch => (ch as Discord.TextChannel).send(embed))
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
