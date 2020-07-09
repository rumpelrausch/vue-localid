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

  install: function (Vue, options) {

    options = options || {};
    options = {
      name: options.name || 'localid'
    };

    function buildId(uid, id) {
      return 'id_' + uid + '_' + id;
    }

    Vue.mixin({
      created: function () {
        this['$' + options.name] = {
          build: (id) => buildId(this._uid, id),
          getId: () => this._uid
        };
      }
    });

    Vue.directive(options.name, {
      bind: function (el, binding, vnode) {
        [
          'id',
          'for',
          'form',
          'aria-activedescendant',
          'aria-controls',
          'aria-describedby',
          'aria-flowto',
          'aria-labelledby',
          'aria-owns'
        ].forEach(tag => {
          if (el.hasAttribute(tag)) {
            el.setAttribute(tag, buildId(vnode.context._uid, el.getAttribute(tag)));
          }
        });
      }
    });

  }
}
