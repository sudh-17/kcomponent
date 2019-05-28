import Model from './model.js'
import View from './view.js'

/**
 * 
 * @param {挂载点} dom 
 * @param {数据源} data 
 */
function Controller(dom, data) {
    this.model = new Model()
    this.view = new View(dom, data)
    this.initAction()
}

//初始化动作
Controller.prototype.initAction = function () {
    let self = this
    this.view.btnAddAction(function () {
        self.view.appendForm()
    })
    this.view.btnDelAction(function (ids) {
        if (!ids || ids.length == 0) {
            alert('请选择要删除的行！')
            return
        }
        self.model.batchDel(ids, function (ids) {
            ids.forEach(id => {
                self.view.removeRow(id)
            })
        })
    })
    this.view.btnOkAction(function (uuid, params) {
        let item = {
            id: uuid,
            data: params
        }
        self.model.add(item, function () {
            self.view.appendRow(uuid, params)
        })
    })
    this.view.btnCancelAction(function (id) {
        self.view.removeRow(id)
    })
    this.view.btnDeleteRowAction(function (id) {
        self.model.del(id, function (id) {
            self.view.removeRow(id)
        })
    })
}

Controller.prototype.getValue = function () {
    return this.model.getAll()
}

export default Controller