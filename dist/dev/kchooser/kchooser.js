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
      return this.data.filter(item => eval(reg).test(item.name) && item.checked === false)
    } else {
      let reg = '/.*' + text + '.*/'
      return this.data.filter(item => eval(reg).test(item.name))
    }
  }
  Model.prototype.query = function (equals, callback = function () { }) {
    let data = this.data.filter(item => equals.call(this, item))
    callback.call(this, data)
  }
  Model.prototype.checked = function (id, callback = function () { }) {
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

  Model.prototype.selected = function (obj, multi, callback = function () { }) {
    if (!multi) {
      this.unCheckAll()
    }
    for (let i = 0; i < this.data.length; i++) {
      if (obj.id === this.data[i].id) {
        this.data[i].checked = obj.checked
        break
      }
    }
    callback.call(this, this.data)
  }

  Model.prototype.selectedCount = function (obj, callback = function () { }) {
    let count = 0;
    this.data.forEach(item => {
      if (item.checked) {
        count++
      }
    })
    return count
  }

  Model.prototype.getSelected = function (callback = function () { }) {
    let data = this.data.filter(item => item.checked === true)
    callback.call(this, data)
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
                      <div class="search-x">
                          <input type="text" class="search" name="search" placeholder="输入关键字搜索"/>
                      </div>
                      <div class="filter-list">
                          <div class="filter-item"><span class="option" val="all">所有人</span><input name="filter" type="radio"><label class=""/></div>
                          <div class="filter-item"><span class="option" val="同部门">同部门</span><input name="filter" type="radio"><label class=""/></div>
                          <div class="filter-item"><span class="option" val="常用人">常用人</span><input name="filter" type="radio"><label class=""/></div>
                      </div>
                    </div>
                    <div class="panel-content">
                        <ul class="panel-list">
                        </ul>
                    </div>
                    <div class="panel-footer">
                      <div class="kfooter-con">
                          <div class="bt-gb">
                              <select class="kfilter" style="display: none;">
                              </select>
                          </div>
                          <div class="bt-gb counter-x">
                              
                              <div class="counter" ${ !this.multiple ? "style=display:none" : ''}>
                                  <label>已选</label>
                                  <span class="counter-num"> 0 </span>
                              </div>
                          </div>
                      </div>
                      <div class="kfooter-con">
                          <div class="bt-gb"><button class="cancel">取消</button></div>
                          <div class="bt-gb"><button class="ok btn-primary">确定</button></div>
                      </div>
                    </div>
                </div>
            </div>`
    this.dom.outerHTML = html
    this.dom = qs(`[w-id="${uuid}"]`, this.parent)
    this.content = qs('.content', this.dom)
    this.panel = qs('.panel', this.dom)
    this.search = qs('.search', this.dom)
    this.list = qs('.panel-list', this.dom)
    // this.backdrop = qs('.backdrop', this.dom)
    this.backdrop = document.createElement('div')
    this.backdrop.className = 'backdrop'
    this.filter = qs('.kfilter', this.dom)
    this.counter = qs('.counter-num', this.dom)
    // this.filterList = qs('.filter-list', this.dom)
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
      html += `<option class="filter-item" value="${item}">${item}</option>`
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

  View.prototype.getSearchText = function () {
    return this.search.value
  }

  View.prototype.setSearchText = function (text) {
    return this.search.value = text
  }

  View.prototype.setCounter = function (value) {
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

  View.prototype.okAction = function (callback = function () { }) {
    let self = this
    $delegated(this.dom, '.ok', 'click', function (e) {
      callback.call(this, e)
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

  View.prototype.itemAction = function (callback = function () { }) {
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
      btnCheck.checked = !self.multiple || !btnCheck.checked
      let obj = {
        id: btnCheck.getAttribute('key'),
        name: btnCheck.value,
        checked: btnCheck.checked
      }
      callback.call(this, obj)
    })
  }

  View.prototype.filterAction = function (callback = function () { }) {
    this.filter.addEventListener('change', function (e) {
      let value = e.target.value
      callback.call(this, value)
    })
  }

  View.prototype.filterListAction = function (callback = function () { }) {
    $delegated(this.panel, '.filter-list .filter-item *', 'click', function (e) {
      let parent = e.target.parentNode
      let input = qs('input[type="radio"]', parent)
      input.checked = true
      let span = qs('.option', parent)
      let value = span.getAttribute('val')
      callback.call(this, value)
    })
  }

  View.prototype.counterAction = function (callback = function () { }) {
    $delegated(this.dom, '.counter-x *', 'click', function () {
      callback.call(this)
    })
  }


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
      let filter = self.view.getFilterValue()
      self.model.query(function (item) {
        let condition1 = filter === 'all' || item.department === filter
        let reg = '/.*' + keyword + '.*/'
        let condition2 = eval(reg).test(item.name)
        return condition1 && condition2
      }, function (data) {
        self.view.renderList(data)
      })
    })
    this.view.cancelAction(function () {
      self.view.modal('hide')
    })
    this.view.itemAction(function (obj) {
      self.model.selected(obj, self.multiple, function () {
        let count = self.model.selectedCount()
        self.view.setCounter(count)
      })
    })
    this.view.filterAction(function (value) {
      let keyword = self.view.getSearchText()
      self.model.query(function (item) {
        let condition1 = value === 'all' || item.department === value
        let reg = '/.*' + keyword + '.*/'
        let condition2 = eval(reg).test(item.name)
        return condition1 && condition2
      }, function (data) {
        self.view.renderList(data)
      })
    })
    this.view.filterListAction(function (value) {
      let keyword = self.view.getSearchText()
      self.model.query(function (item) {
        let condition1 = value === 'all' || item.department === value
        let reg = '/.*' + keyword + '.*/'
        let condition2 = eval(reg).test(item.name)
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

  // 确认事件
  Controller.prototype.onConfirm = function (calllback = function () { }) {
    let self = this
    this.view.okAction(function () {
      self.view.modal('hide')
      calllback.call(this)
    })
  }

  Controller.prototype.getValue = function () {
    let values = []
    let list = this.model.getChecked()
    list.forEach(item => {
      values.push({
        id: item.id,
        name: item.name
      })
    })
    return values
  }

  function init(dom, data, multiple = false) {
    return new Controller(dom, data, multiple)
  }

  let kchooser = {}
  kchooser.init = init
  window.kchooser = kchooser
  
}(window))