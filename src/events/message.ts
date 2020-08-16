import * as Discord from 'discord.js'
import { commands, Command } from '../commands.config'
import { responses, errors } from '../replies.config'

module.exports = {
  run: async (client: Discord.Client, ctx: Discord.Message) => {
    const prefix: string | undefined = process.env.PREFIX
    if (!prefix) return await ctx.channel.send(errors.noBotPrefix)

    if (!ctx.content.startsWith(prefix)) return

    const argPrefix: string = process.env.ARG_PREFIX ?? '--'

    const command: string[] = ctx.content
      .split(argPrefix)
    
    let commandName: string | undefined = command.shift()

    // If command is undefined or only the prefix has been sent
    if (!commandName || !commandName.slice(prefix.length)) return

    commandName = commandName.slice(prefix.length).trim()

    // Parses the command into a Map
    // where `flag => [...values]`
    const args: Map<string, string[] | boolean> = command
      .map(option => option.trim().split(' '))
      .reduce((acc, [key, ...values]) => acc
        .set(key, values.length ? values : true), new Map)

    const commandObj = commands.get(commandName)
    if (!commandObj) return

    // The code below is a series of checks
    // to assure the command is valid all throughout
    const arrayFlags: string[] = [...args.keys()]
    const arrayParams: string[] = Array.from(commandObj.parameters.values())
      .reduce((a, b) => a.concat(b))

    const validFlags: boolean = arrayFlags.every(flag => arrayParams.includes(flag))
    if (!validFlags) {
      return ctx.channel.send(responses.fnNotValidFlag(commandObj.usage))
    }

    const positionalParams: string[] = commandObj.parameters.get('positional')!
    if (!positionalParams) return ctx.channel.send(errors.noPositionalParams)

    const allPositionalFlags: boolean = positionalParams
      .every(flag => arrayFlags.includes(flag))

    if (!allPositionalFlags) {
      return ctx.channel.send(responses.fnMissingPositionalFlag(commandObj.usage))
    }

    // Call the command if everything is ok
    commandObj.run({client: client, command: commandObj, ctx: ctx, args: args})
  },
  name: 'message'
}
