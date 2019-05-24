import Model from './model.js'
import View from './view.js'

/**
 * 
 * @param {挂载点} dom 
 * @param {数据源} data 
 */
function Controller(dom, data) {
    this.model = new Model(data)
    this.view = new View(dom)
}

export default Controller