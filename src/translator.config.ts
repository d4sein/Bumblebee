import fs from 'fs'
import path from 'path'
import { servers, Servers } from './servers.config'

interface TranslatorConfig {
  locales: string[]
  directory: string
  keySeparator: string
}

interface TranslatorContent {
  [content: string]: TranslatorContent | string | undefined
}

class Translator {
  config: TranslatorConfig
  content: TranslatorContent
  servers: Servers

  constructor(servers: Servers) {
    this.config = JSON.parse(
      fs.readFileSync(path.join('.', 'translator.config.json'), 'utf8')
    )

    this.content = {}
    this.servers = servers

    this.init()
  }

  private init(): void {
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
      if (retrieved instanceof Object) {
        retrieved = retrieved[index]
      } else {
        if (typeof retrieved === 'string') {
          return retrieved
        }

        return key
      }
    }
    
    if (typeof retrieved === 'string') {
      return retrieved
    }

    return key
  }

  setLocale(locale: string, server: string): boolean {
    if (this.config.locales.includes(locale)) {
      this.servers.config[server].translator.locale = locale
      this.servers.save()

      return true
    }

    return false
  }

  getLocale(server: string): string {
    return this.servers.config[server].translator.locale
  }
}

const tl = new Translator(servers)
export default tl
