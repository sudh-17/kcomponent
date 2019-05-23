import './index.less'
import Controller from './controller.js'

function init (dom, data) {
  return new Controller(dom, data)
}

let ktable = {}
ktable.init = init
global.ktable = ktable
