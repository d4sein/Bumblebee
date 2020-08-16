import { CommandParams } from '../../commands.config'

module.exports = {
  run: async (params: CommandParams): Promise<void> => {
    params.ctx.channel.send('Pinging..')
      .then(async msg => {
        const latency = msg.createdTimestamp - params.ctx.createdTimestamp
        
        await msg.edit(latency + 'ms')
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
