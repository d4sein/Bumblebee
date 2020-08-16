import * as Discord from 'discord.js'
import { CommandParams } from '../../commands.config'

module.exports = {
  run: async ({ctx, args}: CommandParams): Promise<void> => {
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
