import * as Discord from 'discord.js'
import { cm } from '../commands.config'
import { ErrorHandler } from '../errors.config'

module.exports = {
  name: 'message',
  run: async (client: Discord.Client, ctx: Discord.Message) => {
    await cm.parseCommand(client, ctx)
      .catch(err => {
        // It doesn't need to log errors coming from ErrorHandler
        // since every throw is already under control
        if (err instanceof ErrorHandler) return
        console.error(err)
      })
  }
}
