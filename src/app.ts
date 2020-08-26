import * as fs from 'fs'
import * as path from 'path'

import * as Discord from 'discord.js'
import { cm } from './commands.config'
import { config } from 'dotenv'

config()

const client: Discord.Client = new Discord.Client()

const eventsDir: string = path.join(__dirname, 'events')
const commandsDir: string = path.join(__dirname, 'commands')

function getEvents (dir: string) {
  const files: string[] = fs.readdirSync(dir)

  files
    .filter(event => event.endsWith('.js'))
    .map(event => event.replace('.js', ''))
    .forEach(event => {
      import(path.join(dir, event))
        .then(module => client.on(module.name, module.run.bind(null, client)))
        .catch(err => console.error(err))
    })
}

function getCommandsRecursively (dir: string) {
  const files: fs.Dirent[] = fs.readdirSync(dir, { withFileTypes: true })
  
  files
    .filter(command => command.name.endsWith('.js'))
    .map(command => command.name.replace('.js', ''))
    .forEach(command => {
      import(path.join(dir, command))
        .then(module => cm.commands.set(module.name, module))
        .catch(err => console.error(err))
    })
  
  files
    .filter(dirent => dirent.isDirectory())
    .forEach(dirent => getCommandsRecursively(path.join(dir, dirent.name)))
}

getEvents(eventsDir)
getCommandsRecursively(commandsDir)

client.login(process.env.TOKEN)
