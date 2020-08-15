import * as Discord from 'discord.js'

export interface Command {
  run: (
    {client, ctx, args}: {
      client: Discord.Client,
      ctx: Discord.Message,
      args: Map<string, string[] | boolean>
    }
  ) => Promise<void>,
  name: string,
  description: string,
  usage: string,
  category: string
}

export const commands: Discord.Collection<string, Command> = new Discord.Collection()
