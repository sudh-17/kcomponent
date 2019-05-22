import './index.less'
import Controller from './controller.js'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import './bootstrap-treeview.min.js'

function init (dom, data, multiple = false) {
  return new Controller(dom, data, multiple)
}

let ktree = {}
ktree.init = init
global.ktree = ktree
global.$ = $
