import fs from 'fs'
import path from 'path'
import Discord from 'discord.js'

interface ServersConfig {
  [server: string]: ServerTranslator
}

interface ServerTranslator {
  translator: {
    locale: string
  }
}

export class Servers {
  config: ServersConfig
  directory: string

  constructor() {
    this.config = {}
    this.directory = path.join('.', 'servers.config.json')

    this.init()
  }

  private init(): void {
    if (!fs.existsSync(this.directory)) {
      this.update()
    }

    this.config = JSON.parse(
      fs.readFileSync(this.directory, 'utf8')
    )
  }

  update(): void {
    fs.writeFileSync(
      this.directory,
      JSON.stringify(this.config, null, 4), 'utf8'
    )
  }

  onReadyUpdate(servers: Discord.GuildManager): void {
    servers.cache
      .forEach(server => {
        if (!Object.keys(this.config).includes(server.id)) {
          this.config[server.id] = this.parseServerStruct()
        }
      })
    
    this.update()
  }

  onGuildCreateUpdate(server: Discord.Guild): void {
    this.config[server.id] = this.parseServerStruct()
  }

  parseServerStruct(): ServerTranslator {
    return {
      translator: {
        locale: process.env.TRANSLATOR_DEFAULT_LOCALE ?? 'en-us'
      }
    }
  }
}

export const servers = new Servers()
