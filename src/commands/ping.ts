import * as Discord from 'discord.js'

module.exports = {
  run: async (client: Discord.Client, ctx: Discord.Message, args: string): Promise<void> => {
    console.log(ctx, args)
  },
  name: 'ping'
}
