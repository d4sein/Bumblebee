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

    const locale = typeguards.isString('locale', params)
    let message: string

    if (locale === tl.getLocale()) {
      message = tl.translate('UI.setlocale.same')

      await params.ctx.channel.send(message)
        .catch(console.error)
      
      return
    }

    if (tl.setLocale(locale)) {
      tl.update()
      message = tl.translate('UI.setlocale.success')
    } else {
      message = util.format(tl.translate('UI.setlocale.fail'), locale)
    }
    
    await params.ctx.channel.send(message)
      .catch(console.error)
  }
}
