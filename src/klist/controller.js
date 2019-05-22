import Model from './model.js'
import View from './view.js'

/**
 * 
 * @param {挂载点} dom 
 * @param {数据源} data 
 * @param {多选} multiple 
 */
function Controller(dom, data, multiple = false) {
    this.model = new Model(data)
    this.view = new View(dom, multiple)
    this.multiple = multiple
    
    //初始化动作
    this.initAction()
    //测试
    //this.loadData()
    this.view.initTree(data)
    this.view.modal('show')
}
//加载数据
Controller.prototype.loadData = function () {
   
}
//初始化动作
Controller.prototype.initAction = function () {
    let self = this
    this.view.contentAction(function () {
        self.view.modal('show')
    })
    this.view.okAction(function (data) {
        self.view.modal('hide')
    })
    this.view.cancelAction(function () {
        self.view.modal('hide')
    })
}

Controller.prototype.getValue = function () {
    
}

export default Controller