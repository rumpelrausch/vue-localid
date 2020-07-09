# vue-localid
Vue plugin to implement component scoped tag IDs.

# Use of IDs in Vue components
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

This plugin adds a directive to automatically convert IDs and
several attributes like "for" into application-unique names.  
It's implemented as a fire-and-forget solution code:
You can keep your id-based code and just add the directive
```v-localid``` to the corresponding tags.

Supported attributes:
- id
- for
- form
- aria-activedescendant
- aria-controls
- aria-describedby
- aria-flowto
- aria-labelledby
- aria-owns

# Installation
## NPM
```shell
npm install vue-localid
```

# Usage
Apply the plugin either globally (e.g. in your _main.js_ file)
or from a component.

```javascript
import Vue from 'vue'
import Localid from 'vue-localid'
Vue.use(Localid)
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

# Script access
You can generate compatible IDs from component scripts:
```javascript
// returns the same ID as from the template id/from attributes
let myId = this.$localid.build("cb_enable_something");
```

However, addressing the DOM directly, especially with IDs, might be
considered a Vue anti-pattern.

# Extended usage
## Alternate naming
If the name "localid" is in conflict with any other module or construct
you can use your own name:
```javascript
import Vue from 'vue'
import vuelocalid from 'vue-localid'

Vue.use(vuelocalid, { name: 'compid' })
```
```html
<label for=cb_enable_something" v-compid>
```
```javascript
let myId = this.$compid.build("cb_enable_something");
```

# LICENSE
MIT