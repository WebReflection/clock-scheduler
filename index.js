var clockScheduler = (function (exports) {
  'use strict';

  var now = Date.now;
  var freeze = Object.freeze;
  var slice = [].slice;
  var registry = new Map();
  var method = ['Milliseconds', 'Seconds', 'Minutes', 'Hours', 'Date', 'Month', 'FullYear'];

  var clear = function clear(timer) {
    if (registry.has(timer)) {
      clearTimeout(registry.get(timer));
      registry["delete"](timer);
    }
  };

  var handler = function handler(timer) {
    var fn = timer.fn,
        delay = timer.delay,
        repeat = timer.repeat,
        args = timer.args;
    if (repeat) registry.set(timer, setTimeout(handler, ms(delay), timer));
    fn.apply(null, args);
  };

  var ms = function ms(delay) {
    switch (delay) {
      case 'second':
      case 'seconds':
        return reset(1) - now();

      case 'minute':
      case 'minutes':
        return reset(2) - now();

      case 'hour':
      case 'hours':
        return reset(3) - now();

      case 'day':
      case 'days':
        return reset(4) - now();

      case 'month':
      case 'months':
        return reset(5) - now();

      case 'year':
      case 'years':
        return reset(6) - now();
    }

    return delay;
  };

  var reset = function reset(length) {
    var date = new Date();

    for (var i = 0; i < length; i++) {
      date['set' + method[i]](method[i] === 'Date' ? 1 : 0);
    }

    date['set' + method[length]](date['get' + method[length]]() + 1);
    return date;
  };

  var index = {
    setInterval: function setInterval() {
      return timer.apply(true, arguments);
    },
    setTimeout: function setTimeout() {
      return timer.apply(false, arguments);
    },
    clearInterval: clear,
    clearTimeout: clear
  };

  function timer(fn, delay) {
    var repeat = this == 1;
    var obj = {
      fn: fn,
      delay: delay,
      repeat: repeat,
      args: freeze(slice.call(arguments, 2))
    };
    registry.set(obj, setTimeout(handler, ms(delay), obj));
    return freeze(obj);
  }

  exports.default = index;

  return exports;

}({}).default);
