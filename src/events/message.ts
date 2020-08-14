import * as Discord from 'discord.js'
import { commands, Command } from '../commands.config'

module.exports = {
  run: async (client: Discord.Client, ctx: Discord.Message) => {
    const prefix: string | undefined = process.env.PREFIX
    if (!prefix) return

    const argPrefix: string = process.env.ARG_PREFIX ?? '--'

    const command: string[] | undefined = ctx.content
      .split(argPrefix)

    const commandName: string | undefined = command.shift()
    if (!commandName) return

    const args: Map<string, string[] | boolean> = command
        .map(option => option.trim().split(' '))
        .reduce((acc, [key, ...values]) => acc
          .set(key, values.length ? values : true), new Map)
    
    const commandObj: Command | undefined= commands.get(commandName)
    if (!commandObj) return

    commandObj.run(client, ctx, args)
  },
  name: 'message'
}
