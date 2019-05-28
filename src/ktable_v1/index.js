import './index.less'
import Controller from './controller.js'

function init (dom, data) {
  return new Controller(dom, data)
}

let ktable_v1 = {}
ktable_v1.init = init
global.ktable_v1 = ktable_v1
