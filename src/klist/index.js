import './index.less'
import Controller from './controller.js'
import $ from 'jquery'
//window.jQuery = $
import 'bootstrap/dist/css/bootstrap.min.css'
import './bootstrap-treeview.min.js'
//import 'bootstrap/dist/js/bootstrap.min.js'
// import 'bootstrap/less/button.less'
// import 'bootstrap/less/list-group.less'
// import 'bootstrap/less/type.less'
// console.log('$****', $)

function init (dom, data, multiple = false) {
  return new Controller(dom, data, multiple)
}

let kselect = {}
kselect.init = init
global.kselect = kselect
global.$ = $
