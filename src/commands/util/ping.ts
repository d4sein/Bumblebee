import { CommandParams } from '../../commands.config'

module.exports = {
  run: async ({ctx}: CommandParams): Promise<void> => {
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
