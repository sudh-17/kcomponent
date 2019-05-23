/**
 * Model 
 * @param {数据源} data 
 */
function Model(data) {
    this.data = data
    this.data.forEach(item => {
        item.checked = false
    })
}

Model.prototype.getAll = function () {
    return this.data
}
Model.prototype.getChecked = function () {
    return this.data.filter(item => item.checked === true)
}
Model.prototype.getUnchecked = function () {
    return this.data.filter(item => item.checked === false)
}
Model.prototype.search = function (text, multi = false) {
    if (multi) {
        let reg = '/.*' + text + '.*/'
        return this.data.filter(item => eval(reg).test(item.name) && item.checked === false)
    } else {
        let reg = '/.*' + text + '.*/'
        return this.data.filter(item => eval(reg).test(item.name))
    }
}
Model.prototype.query = function (equals, callback = function () {}) {
    let data = this.data.filter(item => equals.call(this, item))
    callback.call(this, data)
}
Model.prototype.checked = function (id, callback = function(){}) {
    this.data.forEach(item => {
        if (item.id === id) {
            item.checked = true
        } else {
            item.checked = false
        }
    })
    callback.call(this, this.data)
}
Model.prototype.unChecked = function (id) {
    for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].id === id) {
            this.data[i].checked = false
            break
        }
    }
}

// 多选
Model.prototype.multiChecked = function (items = []) {
    items.forEach(item => {
        for (let i = 0; i < this.data.length; i++) {
            if (item.key === this.data[i].key) {
                this.data[i].checked = item.checked
                break
            }
        }
    })
}
Model.prototype.unCheckAll = function () {
    this.data.forEach(item => {
        item.checked = false
    })
}

Model.prototype.selected = function (obj, callback = function(){}) {
    for (let i = 0; i < this.data.length; i++) {
        if (obj.id === this.data[i].id) {
            this.data[i].checked = obj.checked
            break
        }
    }
    callback.call(this, this.data)
}

Model.prototype.selectedCount = function (obj, callback = function(){}) {
    let count = 0;
    this.data.forEach(item => {
        if (item.checked) {
            count ++
        }
    })
    return count
}

Model.prototype.getSelected = function (callback = function () {}) {
    let data = this.data.filter(item => item.checked === true)
    callback.call(this, data)
}

export default Model