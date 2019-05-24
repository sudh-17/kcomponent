import { qs, qsa, $delegated, $insertAfter, createUUID } from '../util/common.js'

/**
     * View
     * @param {挂载节点} dom 
     * @param {是否多选} multiple 
     */
function View(dom, multiple = false) {
    this.dom = dom
    this.parent = dom.parentNode
    this.multiple = multiple
    this.dom.className = 'content'
    this.dom.readOnly = true
    let inputHTML = this.dom.outerHTML
    let uuid = createUUID()
    let html =
        `<div class="wrapper" w-id="${uuid}">
              <div class="content-container">
                 ${inputHTML} 
              </div>
              <div class="kdropdown">
                <ul class="kdrop-ul">
                    <li class="kdrop-li">xxxx</li>
                    <li class="kdrop-li">xxxx</li>
                    <li class="kdrop-li">xxxx</li>
                </ul>
              </div>
          </div>`
    this.dom.outerHTML = html
    this.dom = qs(`[w-id="${uuid}"]`, this.parent)
    this.content = qs('.content', this.dom)
    this.panel = qs('.panel', this.dom)
    this.search = qs('.search', this.dom)
    this.list = qs('.panel-list', this.dom)
    this.backdrop = qs('.backdrop', this.dom)
}

View.prototype.template = function (item) {
    let type = this.multiple ? 'checkbox' : 'radio'
    let tmp = `<li class="panel-item item-zone" data-id="${item.key}">
              <span class="item-zone">${item.value}</span>
              <input class="check item-zone" name="item" key="${item.key}" value="${item.value}" type="${type}" ${item.checked ? 'checked' : ''}>
              <label class="item-zone check-icon ${ this.multiple ? 'rect' : 'circle'}"></label>
          </li>`
    return tmp
}

View.prototype.renderList = function (list) {
    let html = ''
    list.forEach(item => {
        html += this.template(item)
    })
    this.list.innerHTML = html
}


export default View