// import * as Discord from 'discord.js'
// import { CommandParams } from '../../commands.config'
// import { errors } from '../../replies.config'
// import { typeguards } from '../../typeguards.config'

// module.exports = {
//   run: async (params: CommandParams): Promise<void> => {
//     const channel = params.args.get('ch')
//     if (!functions.isArrayOfStrings(params, channel)) return
    
//     const newChannel = (channel as string[])
//       .shift()!
//       .replace(/\D/g, '')

//     const title = params.args.get('title')
//     if (!functions.isArrayOfStrings(params, title)) return

//     const newTitle = (title as string[])
//       .join(' ')

//     const desc = params.args.get('desc')
//     if (!functions.isArrayOfStrings(params, desc)) return

//     const newDesc = (desc as string[])
//       .join(' ')

//     const embed = new Discord.MessageEmbed()
//       .setTitle(newTitle)
//       .setDescription(newDesc)
//       .setColor(process.env.EMBED_COLOR ?? 'DEFAULT')
//       .setTimestamp()

//     await params.client.channels
//       .fetch(newChannel)
//       .then(async ch => {
//         if (!ch) {
//           return await params.ctx.channel.send('The channel you gave me is useless.')
//         }

//         await (ch as Discord.TextChannel).send(embed)
//       })
//       .catch(async () => params.ctx.channel.send(errors.unexpected))
//   },
//   name: 'say',
//   description: 'Sends a message',
//   usage: 'say --ch <channel>! --title <title>! --desc <description>!',
//   category: 'Moderation',
//   parameters: new Map([
//     ['positional', ['ch', 'title', 'desc']],
//     ['optional', []],
//     ['keyword', []]
//   ])
// }
