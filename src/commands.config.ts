import * as Discord from 'discord.js'

export interface CommandParams {
  client: Discord.Client,
  ctx: Discord.Message,
  command: Command,
  args: Map<string, string[] | boolean>
}

export interface Command {
  run: (
    {client, ctx, command, args}: CommandParams
  ) => Promise<void>,
  parameters: Map<string, string[]>,
  name: string,
  description: string,
  usage: string,
  category: string
}

export const commands: Discord.Collection<string, Command> = new Discord.Collection()
