import Theme from '../theme'
import { CssMapper } from './properties'

export function Css(props) {
  
  let _allowed = null;

  let _forbidden = null;

  // copy ALL props, they will be filtered latter
  let _props = {...props}; 

  /*
    **Shorthands** are short names for some specific properties,
    but note that explicitly defined props will take precedence over 
    shorthand names. 
    Example: <Panel fixed position="relative"
    will result in position="relative" being set instead of 'fixed'
  */
  const _shorts = [
    [['fixed','absolute','relative'], 'position'],
    [['round'], 'border-radius'],
    [['pointer'], 'cursor'],
    [['nowrap'], 'white-space'],
    [['grow'], 'flex-grow'],
    [['shrink'], 'flex-shrink'],
    [['flex'], 'flex-direction'],
    [['shadow'], 'box-shadow'],
    [['border','wired'], 'border'], 
  ]

  /*
    Synonyms are props that affect a group of similar props,
    such as mx sets margins left and right
    Example: <Panel mx=1
    will result in ml=1 mr=1
  */
  const _synonyms = {
    'mx': ['ml','mr'],
    'my': ['mt','mb'],
    'px': ['pl','pr'],
    'py': ['pt','pb'],
  }

  return ({

    shorthand(options, prop) {
      let rs = (options || []).filter((opt) => {
        // only use shorthand if it has NO other value
        // example: '<Panel border ...' uses the shorthand 
        // but: '<Panel border="1" ...' must NOT use it
        return _props[opt] !== undefined && _props[opt] === true
      });
      if (rs && rs.length > 0) _props[prop] = rs[0];
      return this; // enable chaining it
    },

    whitelist(allowed) {
      _allowed = allowed;
      return this; // enable chaining it
    },

    blacklist(forbidden) {
      _forbidden = forbidden;
      return this; // enable chaining it
    },

    styled() {
      // first process global shorthands
      _shorts.map((v) => { 
        this.shorthand(v[0], v[1]); 
      })

      // now replace synonyms if they exist
      Object.keys(_synonyms).map((k) => {
        if (_props[k] !== undefined) {
          _synonyms[k].map((t) => {
            _props[t] = _props[k];
          })
        }
      })

      // now apply all valid mapped styles 
      let styles = Object.keys(_props)
        .filter((p) => CssMapper[p] !== undefined && _props[p] !== null)
        .map((p) => CssMapper[p](_props[p]));

      // return a formatted 'style' string
      return styles.join(';');
    },

    classes() {
      /**
       * A very limited set of utility classes, necessary 
       * for additional behaviour in some special cases, 
       * example: hover='some-global-hover-class'
       */
      return(''
        + (!!_props.flex ? ' flexed' : '')
        + (!!_props.transparent ? ' transparent' : '')
        + (!!_props.hover ? (_props.hover !== true ? ' '+_props.hover : ' hover') : '')
        + (Theme.wireframes() ? ' wireframe' : '')
        + (!!_props.markdown ? ' markdown' : '')
      );
    },

    visible(defalt) {
      /**
       * Returns calculated visibility if 'visible' prop is defined,
       * otherwise it returns the given default value
       */
      return (
        !!_props.visible 
          ? (CssMapper['visible'](_props.visible)==='visible:true') 
          : defalt
      );
    }
  })
}
