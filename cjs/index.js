'use strict';
const {now} = Date;
const {freeze} = Object;
const {slice} = [];

const registry = new Map;

const method = [
  'Milliseconds',
  'Seconds',
  'Minutes',
  'Hours',
  'Date',
  'Month',
  'FullYear'
];

const clear = timer => {
  if (registry.has(timer)) {
    clearTimeout(registry.get(timer));
    registry.delete(timer);
  }
};

const handler = timer => {
  const {fn, delay, repeat, args} = timer;
  if (repeat)
    registry.set(timer, setTimeout(handler, ms(delay), timer));
  fn.apply(null, args);
};

const ms = delay => {
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

const reset = length => {
  const date = new Date;
  for (let i = 0; i < length; i++)
    date['set' + method[i]](method[i] === 'Date' ? 1 : 0);
  date['set' + method[length]](date['get' + method[length]]() + 1);
  return date;
};

module.exports = {
  setInterval() { return timer.apply(true, arguments); },
  setTimeout() { return timer.apply(false, arguments); },
  clearInterval: clear,
  clearTimeout: clear
};

function timer(fn, delay) {
  const repeat = this == 1;
  const obj = {fn, delay, repeat, args: slice.call(arguments, 2)};
  registry.set(obj, setTimeout(handler, ms(delay), obj));
  return freeze(obj);
}
