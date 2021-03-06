(function (window) {

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
                  <div class="bt-gb"><button class="cancel">取消</button></div>
                  ${ this.multiple ? '<div class="bt-gb"><button class="ok btn-primary">确定</button></div>' : ''}
                </div>
            </div>
        </div>`
    this.dom.outerHTML = html
    this.dom = qs(`[w-id="${uuid}"]`, this.parent)
    this.content = qs('.content', this.dom)
    this.panel = qs('.panel', this.dom)
    this.search = qs('.search', this.dom)
    this.list = qs('.panel-list', this.dom)
    this.backdrop = document.createElement('div')
    this.backdrop.className = 'backdrop'
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

  View.prototype.modal = function (command) {
    if (command === 'show') {
      this.panel.style.display = 'block'
      qs('body').appendChild(this.backdrop)
      let html = qs('html')
      html.className = html.className + ' pop-modal'
    } else if (command === 'hide') {
      this.panel.style.display = 'none'
      qs('body').removeChild(this.backdrop)
      let html = qs('html')
      html.className = html.className.replace('pop-modal', '')
    } else {
      throw 'view.js的方法modal没有' + command + '命令'
    }
  }

  View.prototype.tag = function (item) {
    let tmp = `<li class="tag" data-id="${item.key}"><label data-id="${item.key}">X</label><span class="tag" title="${item.value}">${item.value}</span></li>`
    return tmp
  }

  View.prototype.appendTag = function (item) {
    this.content.innerHTML += this.tag(item)
  }

  View.prototype.removeTag = function (key) {
    let el = qs('.tag[data-id="' + key + '"]')
    this.content.removeChild(el)
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

  View.prototype.tagAction = function (callback) {
    $delegated(this.content, 'label', 'click', function (e) {
      let id = e.target.getAttribute('data-id')
      callback.call(this, id)
    })
  }

  View.prototype.itemAction = function (callback) {
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
      if (self.multiple) {
        btnCheck.checked = !btnCheck.checked
      } else {
        if (!btnCheck.checked) {
          btnCheck.checked = !btnCheck.checked
          let val = qs('span', dom).innerHTML
          callback.call(this, dom.getAttribute('data-id'), val)
        }
      }
    })
  }

  View.prototype.setWidth = function (value) {
    this.content.style.width = value
  }

  View.prototype.setHeight = function (value) {
    if (!this.multiple) {
      this.content.style.height = value
    }
  }

  /**
 * 
 * @param {挂载点} dom 
 * @param {数据源} data 
 * @param {多选} multiple 
 */
  function Controller(dom, data, multiple = false) {
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
      let data = self.model.search(keyword)
      self.view.renderList(data)
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

    this.view.itemAction(function (key, value) {
      self.model.checked(key)
      self.view.setValue(value)
      self.view.modal('hide')
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

  function init(dom, data, multiple = false) {
    return new Controller(dom, data, multiple)
  }

  let kselect = {}
  kselect.init = init
  window.kselect = kselect

}(window))