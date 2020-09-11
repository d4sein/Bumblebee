import fs from 'fs'
import path from 'path'
import { servers, Servers } from './servers.config'

class Translator {
  config: any // No convenient way to type big JSON objects
  content: any
  servers: Servers

  constructor(servers: Servers) {
    this.config = {}
    this.content = {}
    this.servers = servers

    this.init()
  }

  private init(): void {
    this.config = JSON.parse(
      fs.readFileSync(path.join('.', 'translator.config.json'), 'utf8')
    )

    const contentDir = fs.readdirSync(this.config.directory)

    contentDir
      .filter(c => c.endsWith('.json'))
      .map(c => c.replace('.json', ''))
      .forEach(c => {
        this.content[c] = JSON.parse(
          fs.readFileSync(
            path.join('.', this.config.directory, c + '.json'), 'utf8'
          )
        )
      })
  }

  translate(key: string, server: string): string {
    const indexes = key.split(this.config.keySeparator)
    const locale = this.servers.config[server].translator.locale

    let retrieved = this.content[locale]

    for (const index of indexes) {
      try {
        retrieved = retrieved[index]
      } catch {
        if (typeof retrieved === 'string') {
          return retrieved
        }

        return key
      }
    }
    
    return retrieved
  }

  setLocale(locale: string, server: string): boolean {
    if (this.config.locales.includes(locale)) {
      this.servers.config[server].translator.locale = locale
      this.servers.update()

      return true
    } else {
      return false
    }
  }

  getLocale(server: string): string {
    return this.servers.config[server].translator.locale
  }

  getDefaultLocale(): string {
    return this.config.defaultLocale
  }
}

const tl = new Translator(servers)
export default tl
