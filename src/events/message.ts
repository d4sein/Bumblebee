import * as Discord from 'discord.js'
import { commands, Command } from '../commands.config'
import { responses, errors } from '../replies.config'

module.exports = {
  run: async (client: Discord.Client, ctx: Discord.Message) => {
    const prefix: string | undefined = process.env.PREFIX
    if (!prefix) return await ctx.channel.send(errors.no_bot_prefix)

    if (!ctx.content.startsWith(prefix)) return

    const argPrefix: string = process.env.ARG_PREFIX ?? '--'

    const command: string[] = ctx.content
      .split(argPrefix)
    
    let commandName: string | undefined = command.shift()

    // If command is undefined or only the prefix has been sent
    if (!commandName || !commandName.slice(prefix.length)) {
      return await ctx.channel.send(responses.no_command_given)
    }

    commandName = commandName.slice(prefix.length).trim()

    // Parses the command into a Map
    // where `flag => [...values]`
    const args: Map<string, string[] | boolean> = command
      .map(option => option.trim().split(' '))
      .reduce((acc, [key, ...values]) => acc
        .set(key, values.length ? values : true), new Map)

    const commandObj: Command | undefined = commands.get(commandName)
    if (!commandObj) return ctx.channel.send(responses.not_a_valid_command)

    // The code below is a series of checks
    // to assure the command is valid all throughout
    const arrayArgs: string[] = [...args.keys()]
    const arrayParams: string[] = Array.from(commandObj.parameters.values())
      .reduce((a, b) => a.concat(b))

    const validArgs: boolean = arrayArgs.every(arg => arrayParams.includes(arg))
    if (!validArgs) {
      return ctx.channel.send(responses.fn_not_a_valid_argument(commandObj.usage))
    }

    const positionalParams: string[] | undefined = commandObj.parameters.get('positional')
    if (!positionalParams) return ctx.channel.send(errors.no_positional_params)

    const allPositionalArgs: boolean = positionalParams
      .every(arg => arrayArgs.includes(arg))

    if (!allPositionalArgs) {
      return ctx.channel.send(responses.fn_missing_positional_argument(commandObj.usage))
    }

    // Call the command if everything is ok
    commandObj.run({client: client, ctx: ctx, args: args})
  },
  name: 'message'
}
