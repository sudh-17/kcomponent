import './index.less'
import Controller from './controller.js'

function init (dom, data, multiple = false) {
  return new Controller(dom, data, multiple)
}

let kselect = {}
kselect.init = init
global.kselect = kselect
