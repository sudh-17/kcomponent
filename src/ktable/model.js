/**
 * Model 
 * @param {数据源} data 
 */
function Model(data = []) {
    this.data = data
}

Model.prototype.getAll = function () {
    return this.data
}

Model.prototype.add = function (item, callback = function () {}) {
    this.data.push(item)
    callback.call(this, item)
}

Model.prototype.del = function (id, callback = function () {}) {
    let index = this.data.findIndex(item => item.id === id)
    this.data.splice(index, 1)
    callback.call(this, id)
}
export default Model