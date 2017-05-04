"use strict"

// Object.is polyfill
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
function is(x, y) {
  // SameValue algorithm
  if (x === y) { // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty

// Shallow equal
// https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/shallowEqual.js
exports.unsafeShallowEqual = function(objA, objB) {
  if (is(objA, objB)) {
    return true
  }

  if (typeof objA !== "object" || objA === null ||
      typeof objB !== "object" || objB === null) {
    return false
  }

  var keysA = Object.getOwnPropertyNames(objA)
  var keysBLength = Object.getOwnPropertyNames(objB).length
  if (keysA.length != keysBLength)
    return false

  for (var i = 0; i < keysBLength; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false
    }
  }

  return false
}

exports.unsafeStrictEqual = function(objA, objB) {
  return objA === objB
}