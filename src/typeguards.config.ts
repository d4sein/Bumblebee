import * as Discord from 'discord.js'
import { responses, errors } from './replies.config'
import { CommandParams } from './commands.config'

export const functions = {
  isArray: (params: CommandParams, e: string[] | boolean | undefined): e is string[] => {
    if (typeof e === 'undefined') {
      params.ctx.channel.send(errors.badCommandConfig)
      return false

    } else if (typeof e === 'boolean') {
      params.ctx.channel.send(
        responses.fnIncorrectUsage(params.command.usage)
      )
      return false
    }
    return true
  }
}
