import './index.less'
import Controller from './controller.js'

function init (dom, data) {
  return new Controller(dom, data)
}

let miniSelect = {}
miniSelect.init = init
global.miniSelect = miniSelect
