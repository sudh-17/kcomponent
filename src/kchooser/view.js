import { qs, qsa, $delegated, createUUID } from '../util/common.js'

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
              <div class="panel">
                  <div class="panel-header">
                      <input type="text" class="search" name="search" placeholder="输入关键字搜索"/>
                  </div>
                  <div class="panel-content">
                      <ul class="panel-list">
                      </ul>
                  </div>
                  <div class="panel-footer">
                    <div class="kfooter-con">
                        <div class="bt-gb">
                            <select class="kfilter">
                            </select>
                        </div>
                        <div class="bt-gb counter-x">
                            <div class="counter">
                                <label>已选</label>
                                <span class="counter-num"> 0 </span>
                            </div>
                        </div>
                    </div>
                    <div class="kfooter-con">
                        <div class="bt-gb"><button class="cancel">取消</button></div>
                        ${ this.multiple ? '<div class="bt-gb"><button class="ok btn-primary">确定</button></div>' : ''}
                    </div>
                  </div>
              </div>
              <div class="backdrop"></div>
          </div>`
    this.dom.outerHTML = html
    this.dom = qs(`[w-id="${uuid}"]`, this.parent)
    this.content = qs('.content', this.dom)
    this.panel = qs('.panel', this.dom)
    this.search = qs('.search', this.dom)
    this.list = qs('.panel-list', this.dom)
    this.backdrop = qs('.backdrop', this.dom)
    this.filter = qs('.kfilter', this.dom)
    this.counter = qs('.counter-num', this.dom)
}

View.prototype.template = function (item) {
    let type = this.multiple ? 'checkbox' : 'radio'
    let tmp = `<li class="panel-item item-zone" data-id="${item.id}">
              <span class="item-zone">${item.name}</span>
              <input class="check item-zone" name="item" key="${item.id}" value="${item.name}" type="${type}" ${item.checked ? 'checked' : ''}>
              <label class="item-zone check-icon ${ this.multiple ? 'rect' : 'circle'}"></label>
          </li>`
    return tmp
}

View.prototype.initFilter = function (filters = []) {
    let html = '<option class="filter-item" value="all">全部</option>'
    filters.forEach(item => {
        html += `<option class="filter-item" value="${ item }">${item}</option>`
    })
    this.filter.innerHTML = html
}

View.prototype.renderList = function (list) {
    let html = ''
    list.forEach(item => {
        html += this.template(item)
    })
    this.list.innerHTML = html
}

View.prototype.modal = function (command) {
    if (command === 'show') {
        this.panel.style.display = 'block'
        this.backdrop.style.display = 'block'
    } else if (command === 'hide') {
        this.panel.style.display = 'none'
        this.backdrop.style.display = 'none'
    } else {
        throw 'view.js的方法modal没有' + command + '命令'
    }
}

View.prototype.getSearchText = function () {
    return this.search.value
}

View.prototype.setSearchText = function (text) {
    return this.search.value = text
}

View.prototype.setCounter = function(value) {
    this.counter.innerHTML = value
}

View.prototype.getFilterValue = function () {
    return this.filter.value
}
// ACTION
View.prototype.contentAction = function (callback) {
    let self = this
    // 点击输入框
    $delegated(this.dom, '.content', 'click', function (e) {
        callback.call(this, e)
    })
}

View.prototype.okAction = function (callback) {
    let self = this
    $delegated(this.dom, '.ok', 'click', function (e) {
        let items = qsa('.panel-item > input[name="item"]', self.dom)
        let data = []
        if (items) {
            items.forEach(it => {
                data.push({
                    key: it.getAttribute('key'),
                    value: it.value,
                    checked: it.checked
                })
            })
        }
        callback.call(this, data)
    })
}

View.prototype.cancelAction = function (callback) {
    $delegated(this.dom, '.cancel', 'click', function () {
        callback.call(this)
    })
}

View.prototype.searchAction = function (callback) {
    $delegated(this.dom, '.search', 'input', function (e) {
        let value = e.target.value
        callback.call(this, value)
    })
}

View.prototype.itemAction = function (callback = function(){}) {
    let self = this
    $delegated(this.list, '.item-zone', 'click', function (e) {
        let dom = null
        let el = e.target
        if (el.tagName === 'LI') {
            dom = el
        } else {
            dom = el.parentNode
        }
        let btnCheck = qs('input[name="item"]', dom)
        btnCheck.checked = !btnCheck.checked
        let obj = {
            id: btnCheck.getAttribute('key'),
            name: btnCheck.value,
            checked: btnCheck.checked
        }
        callback.call(this, obj)
    })
}

View.prototype.filterAction = function (callback = function(){}) {
    this.filter.addEventListener('change', function (e) {
        let value = e.target.value
        callback.call(this, value)
    })
}

View.prototype.counterAction = function (callback = function(){}) {
    $delegated(this.dom, '.counter-x *', 'click', function () {
        callback.call(this)
    })
}

export default View