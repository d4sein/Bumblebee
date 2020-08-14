import * as Discord from 'discord.js'

export interface Command {
  run: (client: Discord.Client, ctx: Discord.Message, args: Map<string, string[] | boolean>) => Promise<void>
}

export const commands: Discord.Collection<string, Command> = new Discord.Collection()
