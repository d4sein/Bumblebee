import * as Discord from 'discord.js'

interface Command {
  run: (client: Discord.Client, ctx: Discord.Message, args: string) => Promise<void>
}

export const commands: Discord.Collection<string, Command> = new Discord.Collection()
