import * as Discord from 'discord.js'

module.exports = {
  run: async ({ctx}: {ctx: Discord.Message}): Promise<void> => {
    ctx.channel.send('Pinging..')
      .then(msg => {
        const latency = msg.createdTimestamp - ctx.createdTimestamp
        
        msg.edit(latency + 'ms')
      })
  },
  name: 'ping',
  description: 'Shows the bot\'s latency',
  usage: 'ping',
  category: 'Util',
    parameters: new Map([
    ['positional', []],
    ['optional', []],
    ['keyword', []]
  ])
}
