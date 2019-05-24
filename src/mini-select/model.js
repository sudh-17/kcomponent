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

Model.prototype.getAll = function (callback = function(){}) {
    callback.call(this, this.data)
}

export default Model