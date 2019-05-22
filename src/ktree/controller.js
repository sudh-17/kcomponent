// import Model from './model.js'
import View from './view.js'

/**
 * 
 * @param {挂载点} dom 
 * @param {数据源} data 
 * @param {多选} multiple 
 */
function Controller(dom, data, multiple = false, tag = false) {
    // this.model = new Model(data)
    this.view = new View(dom, multiple, tag)
    this.multiple = multiple

    //初始化view
    this.view.initTree(data)
    this.initAction()
}

//初始化动作
Controller.prototype.initAction = function () {
    let self = this
    this.view.contentAction(function () {
        self.view.setSearchText('')
        self.view.modal('show')
    })
    this.view.cancelAction(function () {
        self.view.modal('hide')
    })
    this.view.searchAction(function (value) {
        self.view.search(value)
    })
}

Controller.prototype.getValue = function () {

}

export default Controller