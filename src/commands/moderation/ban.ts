import * as Discord from 'discord.js'

module.exports = {
  run: async ({ctx, args}: {
    ctx: Discord.Message,
    args: Map<string, string[] | boolean>
  }): Promise<void> => {
    //
  },
  name: 'ban',
  description: 'Bans a user',
  usage: 'ban --user <user>! --reason <reason>',
  category: 'Moderation',
  parameters: new Map([
    ['positional', ['user']],
    ['optional', ['reason']],
    ['keyword', []]
  ])
}
