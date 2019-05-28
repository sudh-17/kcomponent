let qs = function (selector, parent) {
  return (parent || document).querySelector(selector)
}

let qsa = function (selector, parent) {
  return (parent || document).querySelectorAll(selector)
}

let $on = function (target, type, callback, useCapture) {
  target.addEventListener(type, callback, !!useCapture)
}

let $delegated = function (target, selector, type, handler) {
  function dispatchEvent(event) {
    var targetElement = event.target
    var potentialElements = qsa(selector, target)
    var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0

    if (hasMatch) {
      handler.call(targetElement, event)
    }
  }
  var useCapture = type === 'blur' || type === 'focus'

  $on(target, type, dispatchEvent, useCapture)
}

function $insertAfter(dom, newNode) {
  dom.parentNode.insertBefore(newNode, dom.nextSibling)
}

//用于生成uuid
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
function createUUID() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4())
}

function getFormParams(form) {
  if (!form) {
    return {}
  }
  let params = {}
  let elems = form.elements
  for (var i in elems) {
    var elem = elems[i]
    if (elem.nodeName !== "INPUT" && elem.nodeName !== 'TEXTAREA' && elem.nodeName !== 'SELECT') {
      continue
    }
    var name = elem.getAttribute('name')
    if (name) {
      params[name] = elem.value
    }
  }
  return params
}
