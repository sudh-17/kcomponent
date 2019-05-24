import Model from './model.js'
import View from './view.js'

/**
 * 
 * @param {挂载点} dom 
 * @param {数据源} data 
 * @param {多选} multiple 
 */
function Controller(dom, data, multiple = false) {
    this.data = data
    this.model = new Model(data)
    this.view = new View(dom, multiple)
    this.multiple = multiple

    this.initAction()
}

//加载数据
Controller.prototype.loadData = function () {
    let data = this.model.getAll()
    this.view.renderList(data)
}
//初始化动作
Controller.prototype.initAction = function () {
    let self = this
    this.view.contentAction(function (e) {
        self.loadData()
        self.view.modal('show')
        self.view.setSearchText('')
    })
    this.view.searchAction(function (keyword) {
        let filter = self.view.getFilterValue()
        self.model.query(function (item) {
            let condition1 = filter === 'all' || item.department === filter
            let reg = '/.*' + keyword + '.*/'
            let condition2 =  eval(reg).test(item.name)
            return condition1 && condition2
        }, function (data) {
            self.view.renderList(data)
        })
    })
    this.view.cancelAction(function () {
        self.view.modal('hide')
    })
    this.view.itemAction(function (obj) {
        self.model.selected(obj, self.multiple, function () {
            let count = self.model.selectedCount()
            self.view.setCounter(count)
        })
    })
    this.view.filterAction(function (value) {
        let keyword = self.view.getSearchText()
        self.model.query(function(item) {
            let condition1 = value === 'all' || item.department === value
            let reg = '/.*' + keyword + '.*/'
            let condition2 =  eval(reg).test(item.name)
            return condition1 && condition2
        }, function (data) {
            self.view.renderList(data)
        })
    })
    this.view.filterListAction(function (value) {
        let keyword = self.view.getSearchText()
        self.model.query(function(item) {
            let condition1 = value === 'all' || item.department === value
            let reg = '/.*' + keyword + '.*/'
            let condition2 =  eval(reg).test(item.name)
            return condition1 && condition2
        }, function (data) {
            self.view.renderList(data)
        })
    })
    this.view.counterAction(function () {
        self.model.getSelected(function (data) {
            self.view.renderList(data)
        })
    })
}

// 确认事件
Controller.prototype.onConfirm = function (calllback = function (){}) {
    let self = this
    this.view.okAction(function () {
        self.view.modal('hide')
        calllback.call(this)
    })
}

Controller.prototype.getValue = function () {
    let values = []
    let list = this.model.getChecked()
    list.forEach(item => {
        values.push({
            id: item.id,
            name: item.name
        })
    })
    return values
}

export default Controller