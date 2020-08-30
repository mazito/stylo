import { sized, constrained, unconstrained } from './domains'


/*
  **Shorthands** are short names for some specific properties,
  but note that explicitly defined props will take precedence over 
  shorthand names. 
  Example: <Panel fixed position="relative"
  will result in position="relative" being set instead of 'fixed'
*/
export const SHORTHANDS = [
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
  Synonyms are props that affect one or a group of similar 
  props, such as mx sets margins left and right
  Example: <Panel mx=1
  will result in ml=1 mr=1
*/
export const SYNONYMS = {
  'bg': ['background-color'],
  'w': ['width'],
  'h': ['height'],
  'm': ['margin'],
  'ml': ['margin-left'],
  'mr': ['margin-right'],
  'mt': ['margin-top'],
  'mb': ['margin-bottom'],
  'mx': ['margin-left','margin-right'],
  'my': ['margin-top','margin-bottom'],
  'p': ['padding'],
  'pl': ['padding-left'],
  'pr': ['padding-right'],
  'pt': ['padding-top'],
  'pb': ['padding-bottom'],
  'px': ['padding-left','padding-right'],
  'py': ['padding-top','padding-bottom'],
  'rounded': ['border-radius'],
  'minw': ['min-width'],
  'maxw': ['max-width'],
  'minh': ['min-height'],
  'maxh': ['max-height'],
  'font': ['font-family'],
  'weight': ['font-weight'],
  'style': ['font-style'],
  'line': ['line-height'],
  'align': ['text-align'],
  'vertical': ['vertical-align'],
  'items': ['align-items'],
  'justify': ['justify-content'],
  'grow': ['flex-grow'],
  'shrink': ['flex-shrink'],
  'flex': ['flex-direction'],
  'shadow': ['box-shadow'],
  'color': ['fill']
}

/**
  Maps a certain CSS property to a certain domain, 
  its type (restricted, unrestricted, sized), and to a specific
  CSS property.
*/
export const CssMapper = {
  // '': maps(domainFn, 'css-property'),

  'width': maps(sized('sizing'), 'width'),
  'height': maps(sized('sizing'), 'height'),
  'max-width': maps(sized('sizing'), 'max-width'),
  'max-height': maps(sized('sizing'), 'max-height'),
  'min-width': maps(sized('sizing'), 'min-width'),
  'minh': maps(sized('sizing'), 'min-height'),
  'min-height': maps(sized('sizing'), 'min-height'),

  'padding': maps(sized('spacing'), 'padding'),
  'padding-left': maps(sized('spacing'), 'padding-left'),
  'padding-right': maps(sized('spacing'), 'padding-right'),
  'padding-bottom': maps(sized('spacing'), 'padding-bottom'),
  'padding-top': maps(sized('spacing'), 'padding-top'),

  'margin': maps(sized('spacing'), 'margin'),
  'margin-left': maps(sized('spacing'), 'margin-left'),
  'margin-right': maps(sized('spacing'), 'margin-right'),
  'margin-top': maps(sized('spacing'), 'margin-top'),
  'margin-bottom': maps(sized('spacing'), 'margin-bottom'),

  'border-radius': maps(sized('radii'), 'border-radius'),

  'position': maps(constrained('positioning'), 'position'),
  'left': maps(sized('sizing'), 'left'),
  'top': maps(sized('sizing'), 'top'),
  'right': maps(sized('sizing'), 'right'),
  'bottom': maps(sized('sizing'), 'bottom'),

  'overflow': maps(constrained('scrolling'), 'overflow'),
  
  'color': maps(unconstrained('colors'), 'color'),
  'fill': maps(unconstrained('colors'), 'fill'),
  'background-color': maps(unconstrained('colors'), 'background-color'),

  'border': maps(unconstrained('borders'), 'border'),
  'border-top': maps(unconstrained('borders'), 'border-top'),
  'border-left': maps(unconstrained('borders'), 'border-left'),
  'border-bottom': maps(unconstrained('borders'), 'border-bottom'),
  'border-right': maps(unconstrained('borders'), 'border-right'),
  /*
  'border-top-left-radius': measure(props.borderTopLeftRadius) || null,
  'border-bottom-left-radius': measure(props.borderBottomLeftRadius) || null,
  'border-top-right-radius': measure(props.borderTopRightRadius) || null,
  'border-bottom-right-radius': measure(props.borderBottomRightRadius) || null,
  */

  'box-shadow': maps(unconstrained('shadows'), 'box-shadow'),
  
  // Typography
  'font-family': maps(constrained('fontFamilies'), 'font-family'),
  'font-size': maps(unconstrained('fontSizes'), 'font-size'),
  'font-weight': maps(constrained('fontWeights'), 'font-weight'),
  'font-style': maps(constrained('fontStyles'), 'font-styles'),
  'line-height': maps(sized('lineHeights'), 'line-height'),
  //'text-decoration': Theme.fontStyle(props.fontWeight) || null,
  
  // Text props
  'white-space':  maps(constrained('wraps'), 'white-space'),
  'text-align': maps(constrained('horizontalAligns'), 'text-align'),
  'vertical-align': maps(constrained('verticalAligns'), 'vertical-align'),

  // Cursors
  'cursor': maps(constrained('cursors'), 'cursor'),
  
  // Flex props  
  'flex-direction': maps(constrained('flexDirections'), 'flex-direction'),
  'align-items': maps(constrained('flexAlignItems'), 'align-items'),
  'justify-content': maps(constrained('flexJustifyContents'), 'justify-content'),
  'flex-grow': maps(constrained('flexGrows'), 'flex-grow'),
  'flex-shrink': maps(constrained('flexShrinks'), 'flex-shrink'),
  
  // 'hidden' is a very special property, because its not included in CSS
  // but we need it as a visibility toggler
  'visible': maps(unconstrained('booleans'), 'visible'),

  /*
  '': maps(constrained(''), ''),
  '': maps(unconstrained(''), ''),
  '': maps(sized(''), ''),
  */
}


function maps(domainFn, prop) {
  /**
   * The mapping function binding a domain to a CSS property.
   * @domainFn: is a domain fn (sized,constrained,unconstrained).
   * @prop: is the prop to map, received in $$props. 
   * @returns: the domain value getter function. 
   */
  // console.log("Maps ", prop);
  return function(value) {
    /**
     * A value getter function.
     * @value: a prop value
     * @returns: the theme value if it exists, or null
     */
    let v = domainFn(value);
    return(v !== null ? v : null);
  }
}
