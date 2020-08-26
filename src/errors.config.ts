import * as Discord from "discord.js"

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
  constructor(flag: string, ctx: Discord.Message) {
    super(ctx, `The flag "${flag}" should be of type "string".`)
  }
}
