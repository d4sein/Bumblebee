import fs from 'fs'
import path from 'path'

class Translator {
  config: any // No reliable way to type big JSON objects
  content: any

  constructor() {
    this.config = {}
    this.content = {}
    this.update()
  }

  update(): void {
    this.config = JSON.parse(
      fs.readFileSync(path.join('.', 'src/translator.config.json'), 'utf8')
    )

    this.content = JSON.parse(
      fs.readFileSync(
        path.join('.', this.config.directory, this.config.locale + '.json'), 'utf8'
      )
    )
  }

  translate(key: string): string {
    const indexes = key.split(this.config.keySeparator)
    let retrieved = this.content

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

  setLocale(locale: string): boolean {
    if (this.config.locales.includes(locale)) {
      this.config.locale = locale

      fs.writeFileSync(
        path.join('.', 'src/translator.config.json'),
        JSON.stringify(this.config, null, 4), 'utf8'
      )
      return true
    } else {
      return false
    }
  }

  getLocale(): string {
    return this.config.locale
  }
}

const tl = new Translator()
export default tl
