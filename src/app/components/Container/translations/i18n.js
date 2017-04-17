import i18next from 'i18next'
import sprintf from 'i18next-sprintf-postprocessor'
import langDa from './da-DK.json'

var trans = {
  'da-DK': {
    'translation': langDa
  }
}

var options = {
  debug: true,
  lng: 'da-DK',
  resources: trans
}

var i18 = i18next.use(sprintf).init(options)

export default i18
