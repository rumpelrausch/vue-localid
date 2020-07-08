# vue-localid
Vue plugin to implement component scoped tag IDs.

# Use of IDs in Vue components / templates
Sometimes you want or need IDs in your Vue components.
That might by OK if such a component is used only once
within the browser DOM. However, If such a component is
rendered multiple times it produces invalid HTML and
possibly unexpected behaviour.

This example shows a very common HTML construct:
```html
<form>
  <input type="checkbox" id="cb_enable_something">
  <label for="cb_enable_something">
    Enable something
  </label>
</form>
```

Many CSS solutions demand such a construct with a label tag
next to the input tag. The only possible linkage is an
ID. In this case you _need_ IDs, but this code **must never
appear more than once** inside your DOM.

This plugin adds a directive to automatically make IDs and
"for"-attributes application-unique. It's implemented as
a fire-and-forget solution to id-based code.

# Installation
## NPM
```shell
npm install vue-localid
```

# Usage
```javascript
import Vue from 'vue'
import vuelocalid from 'vue-localid'

Vue.use(vuelocalid)
```
If you prefer a shorter form and don't bother about mixing
module syntax, you can use:
```javascript
import Vue from 'vue'

Vue.use(require('vue-localid').default)
```

Apply the directive "localid" to tags containing "id" or
"for" attributes:
```html
<form>
  <input type="checkbox" id="cb_enable_something" v-localid>
  <label for="cb_enable_something" v-localid>
    Enable something
  </label>
</form>
```

This will be rendered as such:
```html
<!-- render result -->
<form>
  <input type="checkbox" id="id_3_cb_enable_something">
  <label for="id_3_cb_enable_something">
    Enable something
  </label>
</form>
```
The applied number (here: 3) is the ```_uid``` member
of the component instance.

# Caveats
There is no API to access generated IDs from scripts as this
would be an anti-pattern within the Vue domain.
The sole purpose is to enable id-based HTML constructs.
Accessing elements from scripts should never be necessary when
using Vue.  
If you really need to identify elements you could use
data-attributes, e.g.
```html
<input data-element="cb_enable_something" ... >
```

The same applies for CSS rules:  
Classes, data-attributes and scoping are safe solutions.

# LICENSE
MIT