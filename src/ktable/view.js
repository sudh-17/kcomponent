import { qs, qsa, $delegated, createUUID } from '../util/common.js'

/**
 * View
 * @param {挂载节点} dom 
 */
function View(dom, data) {
    this.dom = dom
    this.data = data
    this.parent = dom.parentNode
    this.dom.className = 'ktable'
    let outerHTML = this.dom.outerHTML
    let uuid = createUUID()
    let html = `
        <div class="kwrapper" id="${ uuid }">
            <div class="toolbar">
                <button class="btnAdd">add</button>
                <button class="btnDel">del</button>
            </div>
            ${ outerHTML}
        </div>`
    this.dom.outerHTML = html

    this.wrapper = qs(`[id="#${ uuid }"]`, this.parentNode)
    this.table = qs('.ktable', this.wrapper)
    this.initTable(data)
    this.tbody = qs('tbody', this.table)
}

View.prototype.initTable = function (data) {
    let html = `
        <thead class="kheader">
            <th class="kth"></th>
            ${ this.createTitle(data) }
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
    return html
}

View.prototype.rowTemplate = function (item) {
    let tr =  document.createElement('tr')
    tr.className = 'ktr'
    let html= `
        <td class="ktd">x</td>
        <td class="ktd">hhhhhh</td>
        <td class="ktd">hhhhhh</td>
        <td class="ktd">hhhhhh</td>
        <td class="ktd">hhhhhh</td>
        `
    tr.innerHTML = html
    return tr
}

View.prototype.formTemplate = function () {
    let fields = ''
    this.data.forEach(item => {
        fields += `<div><label>${ item.title }: </label><input type="${ item.type }"/></div>`
    })
    let tr =  document.createElement('tr')
    tr.className = 'ktr'
    let html= `
        <td class="ktd">x</td>
        <td class="ktd" colspan="4">${ fields }</td>
        `
    tr.innerHTML = html
    return tr
}

View.prototype.appendRow = function (item) {
    this.tbody.appendChild(this.rowTemplate(item))
}

View.prototype.appendForm = function (field) {
    this.tbody.appendChild(this.formTemplate())
}

// ACTION
View.prototype.btnAddAction = function (callback) {
    $delegated(this.parent, '.btnAdd', 'click', function () {
        callback.call(this)
    })
}

View.prototype.btnDelAction = function (callback) {
    $delegated(this.parent, '.btnDel', 'click', function () {
        callback.call(this)
    })
}


export default View