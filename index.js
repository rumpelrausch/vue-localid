/**
 * The directive "v-localid" extends given "id" and "for"
 * attributes to form an application unique id.
 * 
 * Inputs and labels using "v-localid" can be used multiple
 * times within the same DOM.
 * 
 * The "v-localid" directive has to be added to the
 * corresponding tags. They still need their own "id"
 * and "for" attributes.
 * 
 * @example
 * <input type="checkbox" id="inp_1" v-localid>
 * <label for="inp_1">Feature</label>
 */
export default {
  install: function (Vue) {
    Vue.directive('localid', {
      bind: function (el, binding, vnode) {
        const id = 'id_' + vnode.context._uid + '_';
        ['id', 'for'].forEach(tag => {
          if (el.hasAttribute(tag)) {
            el.setAttribute(tag, id + el.getAttribute(tag));
          }
        });
      }
    })
  }
}
