import fs from 'fs'
import path from 'path'
import Discord from 'discord.js'
import tl from './translator.config'

export class Servers {
  config: any // No convenient way to type big JSON objects
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
          this.config[server.id] = this.parseServerStruct({
            locale: tl.getDefaultLocale()
          })
        }
      })
    
    this.update()
  }

  onGuildCreateUpdate(server: Discord.Guild): void {
    this.config[server.id] = this.parseServerStruct({
      locale: tl.getDefaultLocale()
    })

    this.update()
  }

  parseServerStruct({locale}: {locale: string}): object {
    return {
      "translator": {
        "locale": locale
      }
    }
  }
}

export const servers = new Servers()
