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
    this.treeId = 't' + uuid
    let html =
        `<div class="wrapper" w-id="${uuid}">
              <div class="content-container">
                 ${inputHTML} 
              </div>
              <div class="kpanel">
                  <div class="kpanel-content">
                     <div class="ktreeRoot"></div>
                  </div>
                  <div class="kpanel-footer">
                    <div class="bt-gb"><button class="cancel">关闭</button></div>
                  </div>
              </div>
              <div class="backdrop"></div>
          </div>`
    this.dom.outerHTML = html
    this.dom = qs(`[w-id="${uuid}"]`, this.parent)
    this.content = qs('.content', this.dom)
    this.tree = qs('.ktreeRoot', this.dom)
    this.$tree = $(this.tree)
    this.panel = qs('.kpanel', this.dom)
    this.backdrop = qs('.backdrop', this.dom)

    this.set = new Set()
}

View.prototype.initTree = function (data) {
    let self = this
    this.$tree.treeview({
        data: data,
        showIcon: false,
        showCheckbox: true,
        onNodeChecked: function (event, node) {
            let arr = []
            self.set.add(node.text)
            self.set.forEach(item => {
                arr.push(item)
            })
            self.setValue(arr.join(','))
        },
        onNodeUnchecked: function (event, node) {
            let arr = []
            self.set.delete(node.text)
            self.set.forEach(item => {
                arr.push(item)
            })
            self.setValue(arr.join(','))
        }
    });
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
View.prototype.setValue = function (value) {
    return this.content.value = value
}

View.prototype.getValue = function () {
    return this.content.value
}

View.prototype.getSearchText = function () {
    return this.search.value
}

View.prototype.setSearchText = function (text) {
    return this.search.value = text
}

View.prototype.contentAction = function (callback) {
    // 点击输入框
    $delegated(this.dom, '.content', 'click', function () {
        callback.call(this)
    })
}

View.prototype.okAction = function (callback) {
    let self = this
    $delegated(this.dom, '.ok', 'click', function (e) {
        
        callback.call(this, data)
    })
}

View.prototype.cancelAction = function (callback) {
    $delegated(this.dom, '.cancel', 'click', function () {
        callback.call(this)
    })
}

export default View