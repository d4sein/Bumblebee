import * as Discord from "discord.js"
import { commands, CommandParams, Command } from "../../commands.config"
import { groupBy } from 'underscore'

module.exports = {
  run: async (params: CommandParams): Promise<void> => {
    const categories = new Map(
      Object.entries(
        groupBy([...commands.keys()], (command): string => {
          const module = commands.get(command)
          return module?.category ?? 'Rejected'
        })
      )
    )
    
    const newCategories: Map<string, Command[]> = Array.from(categories.keys())
      .map(category => {
        const arrCommands = categories.get(category)
        if (!arrCommands) return 'Rejected'

        const newArrCommands = arrCommands.map(command => commands.get(command))
        return [category, ...newArrCommands]
    })
    .reduce((acc, [key, ...values]) => acc
      .set(key, values), new Map)
  },
  name: 'help',
  description: 'Shows the list of commands',
  usage: 'help',
  category: 'Util',
    parameters: new Map([
    ['positional', []],
    ['optional', []],
    ['keyword', []]
  ])
}
