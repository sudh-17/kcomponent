import Model from './model.js'
import View from './view.js'

/**
     * 
     * @param {挂载点} dom 
     * @param {数据源} data 
     * @param {多选} multiple 
     */
    function Controller (dom, data, multiple = false) {
      this.model = new Model(data)
      this.view = new View(dom, multiple)
      this.multiple = multiple
      this.initAction()
  }
  //加载数据
  Controller.prototype.loadData = function () {
      let data = this.multiple ? this.model.getUnchecked() : this.model.getAll()
      this.view.renderList(data)
  }
  //初始化动作
  Controller.prototype.initAction = function () {
      let self = this
      this.view.contentAction(function(e){
      self.loadData()
      self.view.modal('show')
      self.view.setSearchText('')
      })
      this.view.searchAction(function(keyword){
      let data = self.model.search(keyword, self.multiple)
      self.view.renderList(data)
      })
      this.view.okAction(function (data) {
      if(data && data.length > 0) {
          if (self.multiple == false) {
          self.model.checked(data[0].key)
          self.view.setValue(data[0].value)
          } else {
          self.model.multiChecked(data)
          data.forEach(it => {
              self.view.appendTag(it)
          })
          }
      }
      self.view.modal('hide')
      })
      this.view.cancelAction(function () {
      self.view.modal('hide')
      })
      this.view.tagAction(function (id) {
      self.view.removeTag(id)
      self.model.unChecked(id)
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

  export default Controller