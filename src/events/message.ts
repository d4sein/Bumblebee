import * as Discord from 'discord.js'
import { commands, Command } from '../commands.config'
import { responses } from '../responses.config'

module.exports = {
  run: async (client: Discord.Client, ctx: Discord.Message) => {
    const prefix: string | undefined = process.env.PREFIX
    if (!prefix) return await ctx.channel.send(responses.no_bot_prefix)

    if (!ctx.content.startsWith(prefix)) return

    const argPrefix: string = process.env.ARG_PREFIX ?? '--'

    const command: string[] = ctx.content
      .split(argPrefix)

    let commandName: string | undefined = command.shift()

    // if command is undefined or only the prefix has been sent
    if (!commandName || !commandName.slice(prefix.length)) {
      return await ctx.channel.send(responses.no_commands_provided)
    }

    commandName = commandName.slice(prefix.length)

    const args: Map<string, string[] | boolean> = command
        .map(option => option.trim().split(' '))
        .reduce((acc, [key, ...values]) => acc
          .set(key, values.length ? values : true), new Map)
    
    const commandObj: Command | undefined = commands.get(commandName)
    if (!commandObj) return ctx.channel.send(responses.not_a_valid_command)

    commandObj.run({client: client, ctx: ctx, args: args})
  },
  name: 'message'
}
