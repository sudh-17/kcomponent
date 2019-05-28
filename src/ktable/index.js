import './index.less'
import Controller from './controller.js'

function init (dom, data, horizontal) {
  return new Controller(dom, data, horizontal)
}

let ktable = {}
ktable.init = init
global.ktable = ktable
