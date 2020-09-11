import * as Discord from 'discord.js'
import { servers } from '../servers.config'

module.exports = {
  name: 'guildCreate',
  run: async (client: Discord.Client, server: Discord.Guild) => {
    servers.onGuildCreateUpdate(server)
  }
}
