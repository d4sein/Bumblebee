import util from 'util'
import * as Discord from 'discord.js'
import tl from './translator.config'


export class ErrorHandler {
  message: string

  constructor(ctx: Discord.Message, message: string) {
    this.message = message
    this.to(ctx)
  }

  private to(ctx: Discord.Message) {
    ctx.channel.send(this.message)
  }
}

export class TypeError extends ErrorHandler {
  constructor(flag: string, type: string, ctx: Discord.Message) {
    super(ctx, util.format(tl.translate('structError.typeError'), flag, type))
  }
}
