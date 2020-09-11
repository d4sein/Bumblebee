import fs from 'fs'
import path from 'path'

export class Servers {
  config: any // No convenient way to type big JSON objects
  directory: string

  constructor() {
    this.config = {}
    this.directory = path.join('.', 'servers.config.json')

    if (fs.existsSync(this.directory)) {
      this.init()
    } else {
      this.update()
      this.init()
    }
  }

  private init(): void {
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
}

export const servers = new Servers()
