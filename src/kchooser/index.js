import './index.less'
import Controller from './controller.js'

function init (dom, data, multiple = false) {
  return new Controller(dom, data, multiple)
}

let kchooser = {}
kchooser.init = init
global.kchooser = kchooser
