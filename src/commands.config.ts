import * as Discord from 'discord.js'

export interface CommandParams {
  client: Discord.Client,
  ctx: Discord.Message,
  command: Command,
  args: Map<string, string[] | boolean>
}

export interface Command {
  name: string,
  run: (
    {client, ctx, command, args}: CommandParams
  ) => Promise<void>
}

class CommandManager {
  commands: Map<string, Command> = new Map()

  async parseCommand(client: Discord.Client, ctx: Discord.Message) {
    // Defaults PREFIX to `;`
    const prefix: string = process.env.PREFIX ?? ';'
    if (!ctx.content.startsWith(prefix)) return

    // Defaults ARG_PREFIX to `--`
    const argPrefix: string = process.env.ARG_PREFIX ?? '--'
    const command: string[] = ctx.content.split(argPrefix)

    let commandName = command.shift()!
    // If command is undefined or only the prefix has been sent
    if (!commandName || !commandName.slice(prefix.length)) return
    
    commandName = commandName.slice(prefix.length).trim()

    // Parses the command into a Map
    // where `flag => [...values]`
    const args: Map<string, string[] | boolean> = command
      .map(arg => arg.trim().split(' '))
      .reduce((acc, [flag, ...values]) => acc
        .set(flag, values.length ? values : true), new Map)

    const commandObj = this.commands.get(commandName)
    if (!commandObj) return

    // Call the command if everything is ok
    await commandObj.run({client: client, ctx: ctx, command: commandObj, args: args})
  }
}

export const cm = new CommandManager()
