import { qs, qsa, $delegated, createUUID, getFormParams } from '../util/common.js'

/**
 * View
 * @param {挂载节点} dom 
 */
function View(dom, data, horizontal = true) {
    this.dom = dom
    this.data = data
    this.horizontal = horizontal
    this.parent = dom.parentNode
    this.dom.className = 'ktable'
    let outerHTML = this.dom.outerHTML
    let uuid = createUUID()
    let html = `
        <div class="kwrapper" w-id="${ uuid}">
            <div class="toolbar">
                <div class="btn-gb">
                    <button class="btnAdd kprimary">添加</button>
                    <button class="btnDel kwarnnig">删除</button>
                </div>
            </div>
            ${ outerHTML}
        </div>`
    this.dom.outerHTML = html
    this.wrapper = qs(`[w-id="${ uuid }"]`, this.parent)
    this.table = qs('.ktable', this.wrapper)
    this.initTable(data)
    this.tbody = qs('tbody', this.table)
    this.status = 'notform'
    this.initAction()
}

View.prototype.initTable = function (data) {
    let html = `
        <thead class="kheader">
            <th class="kth" style="width: 26px;"><input type="checkbox" name="toggleAll"/></th>
            ${ this.createTitle(data)}
        </thead>
        <tbody class="ktbody"></tbody>
        `
    this.table.innerHTML = html
}

View.prototype.createTitle = function (data) {
    let html = ''
    data.forEach(item => {
        html += '<th class="kth">' + item.title + '</th>'
    })
    html += '<th class="kth" style="width: 40px;">操作</th>'
    return html
}


View.prototype.getTitleByField = function (field) {
    for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].field === field) {
            return this.data[i].title
        }
    }
    return ''
}

View.prototype.createTrTemplate = function (uuid, params) {
    let html = ''
    if (this.horizontal === true) {
        html = `<td class="ktd"><input type="checkbox" name="toggle"/></td>`
        Object.keys(params).forEach(key => {
            html += `<td class="ktd">${params[key]}</td>`
        })
    } else {
        let li = ''
        Object.keys(params).forEach(key => {
            li += `<li><div class="detail">
            <div class="detail-key"><label>${ this.getTitleByField(key)} : <label></div>
            <div class="detail-val"> ${ params[key]}</div></div>
            </li>`
        })
        html = `<td class="ktd"><input type="checkbox" name="toggle"/></td>
        <td class="ktd" colspan="${ this.data.length}"><ul>${li}</ul></td>`
    }
    html += `<td class="ktd">
            <div style="padding: 5px 2px;">
                <a class="del-row" href="javascript:;" data-id="${uuid}" style="display: block; margin-bottom: 10px;">删除</a>
                <a class="edit-row" href="javascript:;" data-id="${ uuid}">修改</a>
            </div>
        </td>`
    let tr = document.createElement('tr')
    tr.setAttribute('data-id', uuid)
    tr.className = 'ktr'
    tr.innerHTML = html
    return tr
}

View.prototype.formTemplate = function () {
    let uuid = createUUID()
    let fields = ''
    this.data.forEach(item => {
        if (item.type === 'text' || item.type === 'number' || item.type === 'date' || item.type === 'password') {
            fields += `<div class="field-con">
                <div class="field-la">
                    <label>${ item.title}: </label>
                </div>
                <div class="field-item">
                    <input name="${ item.field}" type="${item.type}"/>
                </div>
            </div>`
        } else if (item.type == 'textarea') {
            fields += `<div class="field-con">
                <div class="field-la">
                    <label>${ item.title}: </label>
                </div>
                <div class="field-item">
                    <textarea name="${ item.field}"></textarea>
                </div>
            </div>`
        } else if (item.type == 'select') {
            fields += `<div class="field-con">
                <div class="field-la">
                    <label>${ item.title}: </label>
                </div>
                <div class="field-item">
                    <select name="${ item.field}">
                        <option>${ item.option.join('</option><option>')}</option>
                    </select>
                </div>
            </div>`
        }
    })
    let footer = `<div class="form-footer">
            <button data-id="${ uuid}" type="button" class="row-cancel">取消</button>
            <button data-id="${ uuid}" type="button" class="row-ok kprimary">确定</button>
        </div>`
    let tr = document.createElement('tr')
    tr.className = 'ktr'
    tr.setAttribute('data-id', uuid)
    let html = `
        <td class="ktd"></td>
        <td class="ktd" colspan="${ this.data.length + 1}"><form data-id="${uuid}">${fields + footer}</form></td>
        `
    tr.innerHTML = html
    return tr
}


View.prototype.appendForm = function () {
    if (this.status === 'notform') {
        this.tbody.appendChild(this.formTemplate())
        this.status = 'form'
    } else {
        alert('当前有未处理的行！')
    }
}

View.prototype.removeRow = function (uuid) {
    let tr = qs(`tr[data-id="${uuid}"]`, this.tbody)
    this.tbody.removeChild(tr)
    this.status = 'notform'
}

View.prototype.appendRow = function (uuid, params) {
    let tr = this.createTrTemplate(uuid, params)
    this.removeRow(uuid)
    this.tbody.appendChild(tr)
    this.status = 'notform'
}

// ACTION
View.prototype.btnAddAction = function (callback = function () { }) {
    $delegated(this.parent, '.btnAdd', 'click', function () {
        callback.call(this)
    })
}

View.prototype.btnDelAction = function (callback = function () { }) {
    $delegated(this.parent, '.btnDel', 'click', function () {
        let ids = []
        let rows = qsa('.ktr', this.tbody)
        rows.forEach(item => {
            let checkbox = qs('input[name="toggle"]', item)
            if (checkbox && checkbox.checked) {
                ids.push(item.getAttribute('data-id'))
            }
        })
        callback.call(this, ids)
    })
}

View.prototype.btnOkAction = function (callback = function () { }) {
    $delegated(this.tbody, '.row-ok', 'click', function (e) {
        let uuid = e.target.getAttribute('data-id')
        let form = qs(`form[data-id="${uuid}"]`, this.tbody)
        let params = getFormParams(form)
        callback.call(this, uuid, params)
    })
}

View.prototype.btnCancelAction = function (callback = function () { }) {
    $delegated(this.tbody, '.row-cancel', 'click', function (e) {
        let uuid = e.target.getAttribute('data-id')
        callback.call(this, uuid)
    })
}

View.prototype.btnDeleteRowAction = function (callback = function () { }) {
    $delegated(this.tbody, '.del-row', 'click', function (e) {
        let flag = confirm('确定要删除吗？')
        if (!flag) {
            return
        }
        let uuid = e.target.getAttribute('data-id')
        callback.call(this, uuid)
    })
}

View.prototype.toggleAllAction = function () {
    $delegated(this.table, 'input[name="toggleAll"]', 'click', function (e) {
        let toggleAll = e.target
        let toggles = qsa('input[name="toggle"]', this.table)
        toggles.forEach(item => {
            item.checked = toggleAll.checked
        })
    })
}

View.prototype.toggleAction = function () {
    let self = this
    $delegated(this.table, 'input[name="toggle"]', 'click', function (e) {
        let toggles = qsa('input[name="toggle"]', self.table)
        let flag = true
        toggles.forEach(item => {
            if (item.checked === false) {
                flag = false
            }
        })
        let toggleAll = qs('input[name="toggleAll"]', self.table)
        toggleAll.checked = flag
    })
}

//使用观察者模式
View.prototype.tbodyAction = function () {
    let self = this
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    let observer = new MutationObserver((mutationList) => {
      for (let mutation of mutationList) {
        if (mutation.type === 'childList') {
          let toggles = qsa('input[name="toggle"]', self.table)
          let flag = toggles.length !== 0
          toggles.forEach(item => {
              if (item.checked === false) {
                  flag = false
              }
          })
          let toggleAll = qs('input[name="toggleAll"]', self.table)
          toggleAll.checked = flag
        }
      }
    })
    observer.observe(this.tbody, { childList: true })
}

// 初始化事件
View.prototype.initAction = function () {
    this.toggleAllAction()
    this.toggleAction()
    this.tbodyAction()
}

export default View