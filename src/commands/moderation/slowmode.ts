import { CommandParams } from "../../commands.config"
import { typeguards } from '../../typeguards.config'

module.exports = {
  name: 'slowmode',
  run: async (params: CommandParams): Promise<void> => {
    let channel = typeguards.isOptString('ch', params) ?? params.ctx.channel.id
    channel = channel.replace(/\D/g, '')

    channel
  }
}
