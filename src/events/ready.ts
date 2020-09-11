import * as Discord from 'discord.js'
import { servers } from '../servers.config'

module.exports = {
  name: 'ready',
  run: async (client: Discord.Client) => {
    servers.onReadyUpdate(client.guilds)
    console.log('PAI TA ON')
  }
}
