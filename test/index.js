const Clock = require('../cjs');

let timeout = 0;
Clock.setTimeout(
  (a, b, c) => {
    console.assert(timeout++ === 0);
    console.assert(a === 1);
    console.assert(b === 2);
    console.assert(c === 3);
    let interval = 0;
    let timer = Clock.setInterval(
      () => {
        if (2 < interval++) {
          Clock.clearInterval(timer);
          timer = Clock.setTimeout(() => console.assert(false), 'seconds');
          Clock.clearTimeout(timer);
          timer = Clock.setTimeout(() => console.assert(false), 'minute');
          Clock.clearTimeout(timer);
          timer = Clock.setTimeout(() => console.assert(false), 'minutes');
          Clock.clearTimeout(timer);
          timer = Clock.setInterval(() => console.assert(false), 'hour');
          Clock.clearInterval(timer);
          timer = Clock.setInterval(() => console.assert(false), 'hours');
          Clock.clearInterval(timer);
          timer = Clock.setTimeout(() => console.assert(false), 'day');
          Clock.clearTimeout(timer);
          timer = Clock.setTimeout(() => console.assert(false), 'days');
          Clock.clearTimeout(timer);
          timer = Clock.setInterval(() => console.assert(false), 'month');
          Clock.clearInterval(timer);
          timer = Clock.setInterval(() => console.assert(false), 'months');
          Clock.clearInterval(timer);
          timer = Clock.setInterval(() => console.assert(false), 'year');
          Clock.clearInterval(timer);
          timer = Clock.setInterval(() => console.assert(false), 'years');
          Clock.clearInterval(timer);
          Clock.clearInterval(timer);
        }
      },
      100
    );
  },
  'second',
  1, 2, 3
);
