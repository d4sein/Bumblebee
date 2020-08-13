import * as Discord from 'discord.js'

module.exports = {
  run: async (client: Discord.Client, ctx: Discord.Message) => {
    console.log(ctx.content)
  },
  name: 'message'
}
