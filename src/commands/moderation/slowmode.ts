import { CommandParams } from "../../commands.config"
import { typeguards } from '../../typeguards.config'

module.exports = {
  run: async (params: CommandParams): Promise<void> => {
    // WORK IN PROGRESS
    // WORK IN PROGRESS
    // WORK IN PROGRESS
    
    let channel = typeguards.isOptString('ch', params) ?? params.ctx.channel.id
    if (channel) channel = channel.replace(/\D/g, '')
  },
  name: 'slowmode',
  description: 'Sets slowmode to a channel',
  usage: 'slowmode --ch <channel> --delay <delay>! --for <time>',
  category: 'Moderation'
}
