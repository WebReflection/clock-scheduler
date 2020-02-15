# clock-scheduler

[![Build Status](https://travis-ci.com/WebReflection/clock-scheduler.svg?branch=master)](https://travis-ci.com/WebReflection/clock-scheduler) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/clock-scheduler/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/clock-scheduler?branch=master) ![WebReflection status](https://offline.report/status/webreflection.svg)

Same as `setTimeout` and `setInterval` but pinned to the clock.

**[Live Demo](https://codepen.io/WebReflection/pen/JjdXdyo)** - a clock that changes background when a minute changes

```js
import Clock from 'clock-scheduler';
const Clock = require('clock-scheduler');
// https://unpkg.com/clock-scheduler

// will log next date whenever the next minute will tick
const uid = Clock.setTimeout(
  // a callback to invoke at next clock tick
  random => console.log(random, new Date),

  // second(s), minute(s), hour(s), day(s), month(s), year(s)
  'minute',

  // any extra argument allowed, just like setInterval/Timeout
  Math.random()
);
// Clock.clearInterval(uid);
```
