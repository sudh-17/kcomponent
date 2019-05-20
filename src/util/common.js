let qs = function(selector ,parent){
  return (parent || document).querySelector(selector)
  }
  
  let qsa = function(selector ,parent){
  return (parent || document).querySelectorAll(selector)
  }
  
  let $on = function(target,type,callback,useCapture){
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

  module.exports = {
    qs,
    qsa,
    $delegated
  }
