import * as Discord from 'discord.js'
import { commands } from '../commands.config'
import { responses, errors } from '../replies.config'

module.exports = {
  run: async (client: Discord.Client, ctx: Discord.Message) => {
    // Defaults PREFIX to `;`
    const prefix: string = process.env.PREFIX ?? ';'
    if (!ctx.content.startsWith(prefix)) return

    // Defaults ARG_PREFIX to `--`
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
      .map(arg => arg.trim().split(' '))
      .reduce((acc, [flag, ...values]) => acc
        .set(flag, values.length ? values : true), new Map)

    const commandObj = commands.get(commandName)
    if (!commandObj) return

    // The code below is a series of checks
    // to ensure the command is valid all throughout
    const arrayFlags: string[] = [...args.keys()]
    const arrayParams: string[] = Array.from(commandObj.parameters.values())
      .reduce((a, b) => a.concat(b))

    const validFlags: boolean = arrayFlags.every(flag => arrayParams.includes(flag))
    if (!validFlags) {
      return ctx.channel.send(responses.fnIncorrectUsage(commandObj.usage))
    }

    const positionalParams: string[] | undefined = commandObj.parameters.get('positional')
    if (!positionalParams) return ctx.channel.send(errors.badCommandConfig)

    const allPositionalFlags: boolean = positionalParams
      .every(flag => arrayFlags.includes(flag))

    if (!allPositionalFlags) {
      return ctx.channel.send(responses.fnIncorrectUsage(commandObj.usage))
    }

    // Call the command if everything is ok
    commandObj.run({client: client, command: commandObj, ctx: ctx, args: args})
  },
  name: 'message'
}
