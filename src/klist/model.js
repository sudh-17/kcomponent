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
        return this.data.filter(item => eval(reg).test(item.value) && item.checked === false)
    } else {
        let reg = '/.*' + text + '.*/'
        return this.data.filter(item => eval(reg).test(item.value))
    }
}
Model.prototype.checked = function (key) {
    this.data.forEach(item => {
        if (item.key === key) {
            item.checked = true
        } else {
            item.checked = false
        }
    })
}
Model.prototype.unChecked = function (key) {
    for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].key === key) {
            this.data[i].checked = false
            break
        }
    }
}
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

export default Model