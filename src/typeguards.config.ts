import * as errors from './errors.config'
import { CommandParams } from './commands.config'

class TypeGuard {
  isString(flag: string, params: CommandParams): string {
    const element = params.args.get(flag)

    if (element instanceof Array && element.length === 1) {
      return element.shift()!
    }

    throw new errors.TypeError(flag, 'string', params.ctx)
  }

  isArrayStrings(flag: string, params: CommandParams): string[] {
    const element = params.args.get(flag)

    if (element instanceof Array) {
      return element
    }

    throw new errors.TypeError(flag, 'string[]', params.ctx)
  }

  isOptString(flag: string, params: CommandParams): string | null {
    const element = params.args.get(flag)

    if (element instanceof Array && element.length === 1) {
      return element.shift()!
    }

    return null
  }
}

export const typeguards = new TypeGuard()
