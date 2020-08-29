import Theme from './theme';
import { SHORTHANDS, SYNONYMS, CssMapper } from './css-properties';


function replaceShorthand(options, prop, _props) {
  let rs = (options || []).filter((opt) => {
    // only use shorthand if it has NO other value
    // example: '<Panel border ...' uses the shorthand 
    // but: '<Panel border="1" ...' must NOT use it
    return _props[opt] !== undefined && _props[opt] === true
  });
  if (rs && rs.length > 0) {
    _props[prop] = rs[0];
    delete _props[rs[0]]; // MUST delete the shorthand to avoid problems with SYNONYS
    console.log("Shorthand ", prop, _props[prop], options)
  }

  return _props; 
}

function replaceSynonyms(_props) {
  // now replace synonyms if they exist
  Object.keys(SYNONYMS).map((k) => {
    if (_props[k] !== undefined) {
      SYNONYMS[k].map((t) => {
        _props[t] = _props[k];
      })
    }
  })
  return _props;
}


export function Css(props) {
  
  // copy ALL props, they will be filtered latter
  let _props = {...props}; 

  if (_props['shadow'] || _props['box-shadow']) {
    console.log('alert')
  }

  // first process all global shorthands
  SHORTHANDS.map((v) => { 
    _props = replaceShorthand(v[0], v[1], _props); 
  })

  if (_props['shadow'] || _props['box-shadow']) {
    console.log('alert')
  }

  // now replace all global synonyms 
  _props = replaceSynonyms(_props);

  if (_props['shadow'] || _props['box-shadow']) {
    console.log('alert')
  }

  // now _props contains only "valid" CSS properties

  return ({

    props() {
      return _props;
    },

    get(name) {
      return(
        (_props[name] !== undefined) 
          ? CssMapper[name](_props[name])
          : null
      )
    },

    set(name, value) {
      if (!!name && value!==null) _props[name] = value;
      return this; // enable chaining it
    },

    shorthand(options, prop) {
      _props = replaceShorthand(options, prop, _props);
      return this; // enable chaining it
    },

    synonym(name, prop) {
      if (!!_props[name]) _props[prop] = _props[name];
      return this; // enable chaining it
    },
    
    whitelist(allowed) {
      Object.keys(_props).map((t) => {
        if (!(allowed || []).includes(t)) delete _props[t];
      })
      return this; // enable chaining it
    },

    blacklist(forbidden) {
      (forbidden || []).map((t) => { 
        if (_props[t] !== undefined) delete _props[t];
      })
      return this; // enable chaining it
    },

    styled(vw) {
      /** 
       * Apply all valid mapped styles
       * @returns: the 'style' string. 
       */
      let styles = Object.keys(_props)
        .filter((p) => CssMapper[p] !== undefined && _props[p] !== null)
        .map((p) => {
          const v = CssMapper[p](_props[p]);
          return (v !== null ? `${p}:${v}` : '');
        })

      // return a formatted 'style' string
      return styles.join(';');
    },

    classes(vw) {
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

    visible(show, vw) {
      /**
       * Returns calculated visibility if 'visible' prop is defined,
       * otherwise it returns the given default value.
       */
      return (
        !!_props.visible 
          ? (CssMapper['visible'](_props.visible)==='true') 
          : show
      );
    }
  })
}
