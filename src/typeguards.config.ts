import * as errors from './errors.config'
import { CommandParams } from './commands.config'

class TypeGuard {
  isString(flag: string, params: CommandParams): string {
    const element = params.args.get(flag)

    if (element instanceof Array && element.length === 1) {
      return element.shift()!
    }

    throw new errors.TypeError(flag, params.ctx)
  }
}

export const typeguards = new TypeGuard()
