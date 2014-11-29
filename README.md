# jquery-ajax-wrap

This lets you wrap jQuery.ajax with a Promise library of your choice. It's
inspired by [ic-ajax](https://github.com/instructure/ic-ajax) except without
the Ember dependency.

```javascript
import {
  configure,
  request
} from 'jquery-ajax-wrap';

configure({
  jQuery: window.jQuery,
  Promise: RSVP.Promise
});

request('/api/users')
  .then(function(response) {
    // ...
  }, function(response) {
    // ...
  });
```
