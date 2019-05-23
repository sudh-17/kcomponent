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
    
    this.init()
    this.initAction()

    this.loadData()
        this.view.modal('show')
}

Controller.prototype.init = function () {
    let set = new Set()
    this.data.forEach(item => {
        set.add(item.department)
    })
    this.view.initFilter(set)
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
    this.view.okAction(function (data) {
        if (self.multiple == false) {
            self.model.checked(data[0].key)
            self.view.setValue(data[0].value)
        } else {
            self.model.multiChecked(data)
            let list = self.model.getChecked()
            let values = []
            list.forEach(it => {
                values.push(it.value)
            })
            self.view.setValue(values.join(','))
        }
        self.view.modal('hide')
    })
    this.view.cancelAction(function () {
        self.view.modal('hide')
    })
    this.view.itemAction(function (obj) {
        self.model.selected(obj, function (data) {
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
    this.view.counterAction(function () {
        self.model.getSelected(function (data) {
            self.view.renderList(data)
        })
    })
}

Controller.prototype.getValue = function () {
    let value = []
    let src = this.model.getChecked()
    src.forEach(item => {
        value.push(item.value)
    })
    if (this.multiple) {
        return value
    } else {
        return value.join('')
    }
}

Controller.prototype.setOption = function (opt) {
    let option = {
        width: '80vw',
        ...opt
    }
    this.view.setWidth(option.width)
    if (option.height) {
        this.view.setHeight(option.height)
    }
}

export default Controller