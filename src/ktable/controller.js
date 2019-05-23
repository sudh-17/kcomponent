import Model from './model.js'
import View from './view.js'

/**
 * 
 * @param {挂载点} dom 
 * @param {数据源} data 
 */
function Controller(dom, data) {
    //this.model = new Model(data)
    this.view = new View(dom, data)
    this.initAction()
}
//加载数据
Controller.prototype.loadData = function () {
    //let data = this.model.getAll()
    //this.view.renderList(data)
}
//初始化动作
Controller.prototype.initAction = function () {
    let self = this
    this.view.btnAddAction(function () {
        self.view.appendForm(null)
    })
    this.view.btnDelAction(function () {
        console.log('del')
    })
}

export default Controller