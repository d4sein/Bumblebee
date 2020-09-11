import util from 'util'
import { CommandParams } from '../../commands.config'
import { typeguards } from '../../typeguards.config'
import tl from '../../translator.config'

module.exports = {
  name: 'setlocale',
  run: async (params: CommandParams): Promise<void> => {
    if (!params.ctx.member!.hasPermission('ADMINISTRATOR')) {
      return
    }

    const server = params.ctx.guild!.id

    const locale = typeguards.isString('locale', params)
    let message: string

    if (locale === tl.getLocale(params.ctx.guild!.id)) {
      message = tl.translate('UI.setlocale.same', server)

      await params.ctx.channel.send(message)
        .catch(console.error)
      
      return
    }

    const success = tl.setLocale(locale, server)

    if (success) {
      message = tl.translate('UI.setlocale.success', server)
    } else {
      message = util.format(tl.translate('UI.setlocale.fail', server), locale)
    }
    
    await params.ctx.channel.send(message)
      .catch(console.error)
  }
}
