import { sized, constrained, unconstrained } from './domains'

/**
 * Maps a received property (in $$props) to a certain domain, 
 * its type (restricted, unrestricted, sized), and to a specific
 * CSS property.
 */
export const CssMapper = {
  // '': maps(domainFn, 'css-property'),

  'w': maps(sized('sizing'), 'width'),
  'width': maps(sized('sizing'), 'width'),
  'h': maps(sized('sizing'), 'height'),
  'height': maps(sized('sizing'), 'height'),
  'maxw': maps(sized('sizing'), 'max-width'),
  'max-width': maps(sized('sizing'), 'max-width'),
  'maxh': maps(sized('sizing'), 'max-height'),
  'max-height': maps(sized('sizing'), 'max-height'),
  'minw': maps(sized('sizing'), 'min-width'),
  'min-width': maps(sized('sizing'), 'min-width'),
  'minh': maps(sized('sizing'), 'min-height'),
  'min-height': maps(sized('sizing'), 'min-height'),

  'p': maps(sized('spacing'), 'padding'),
  'pl': maps(sized('spacing'), 'padding-left'),
  'pr': maps(sized('spacing'), 'padding-right'),
  'pb': maps(sized('spacing'), 'padding-bottom'),
  'pt': maps(sized('spacing'), 'padding-top'),
  'padding': maps(sized('spacing'), 'padding'),
  'padding-left': maps(sized('spacing'), 'padding-left'),
  'padding-right': maps(sized('spacing'), 'padding-right'),
  'padding-bottom': maps(sized('spacing'), 'padding-bottom'),
  'padding-top': maps(sized('spacing'), 'padding-top'),

  'm': maps(sized('spacing'), 'margin'),
  'ml': maps(sized('spacing'), 'margin-left'),
  'mr': maps(sized('spacing'), 'margin-right'),
  'mt': maps(sized('spacing'), 'margin-top'),
  'mb': maps(sized('spacing'), 'margin-bottom'),
  'margin': maps(sized('spacing'), 'margin'),
  'margin-left': maps(sized('spacing'), 'margin-left'),
  'margin-right': maps(sized('spacing'), 'margin-right'),
  'margin-top': maps(sized('spacing'), 'margin-top'),
  'margin-bottom': maps(sized('spacing'), 'margin-bottom'),

  'rounded': maps(sized('radii'), 'border-radius'),
  'border-radius': maps(sized('radii'), 'border-radius'),

  'position': maps(constrained('positioning'), 'position'),
  'left': maps(sized('sizing'), 'left'),
  'top': maps(sized('sizing'), 'top'),
  'right': maps(sized('sizing'), 'right'),
  'bottom': maps(sized('sizing'), 'bottom'),

  'overflow': maps(constrained(''), 'overflow'),
  
  'color': maps(unconstrained('colors'), 'color'),
  'bg': maps(unconstrained('colors'), 'background-color'),
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

  'shadow': maps(unconstrained('shadows'), 'box-shadow'),
  'box-shadow': maps(unconstrained('shadows'), 'box-shadow'),
  
  // Typography
  'family': maps(constrained('fontFamilies'), 'font-family'),
  'font-family': maps(constrained('fontFamilies'), 'font-family'),
  'font-size': maps(unconstrained('fontSizes'), 'font-size'),
  'weight': maps(constrained('fontWeights'), 'font-weight'),
  'font-weight': maps(constrained('fontWeights'), 'font-weight'),
  'style': maps(constrained('fontStyles'), 'font-styles'),
  'font-style': maps(constrained('fontStyles'), 'font-styles'),
  'line': maps(sized('lineHeights'), 'line-height'),
  'line-height': maps(sized('lineHeights'), 'line-height'),
  //'text-decoration': Theme.fontStyle(props.fontWeight) || null,
  
  // review
  'nowrap': maps(constrained('wraps'), 'white-space'),
  'white-space':  maps(constrained('wraps'), 'white-space'),

  'align': maps(constrained('horizontalAligns'), 'text-align'),
  'text-align': maps(constrained('horizontalAligns'), 'text-align'),
  'vertical': maps(constrained('verticalAligns'), 'vertical-align'),
  'vertical-alignment': maps(constrained('verticalAligns'), 'vertical-align'),
  
  'cursor': maps(constrained('cursors'), 'cursor'),
  
  // Flex props  
  'flex': maps(constrained('flexDirections'), 'flex-direction'),
  'flex-direction': maps(constrained('flexDirections'), 'flex-direction'),
  'items': maps(constrained('flexAlignItems'), 'align-items'),
  'align-items': maps(constrained('flexAlignItems'), 'align-items'),
  'justify': maps(constrained('flexJustifyContents'), 'justify-content'),
  'justify-content': maps(constrained('flexJustifyContents'), 'justify-content'),
  'grow': maps(constrained('flexGrows'), 'flex-grow'),
  'flex-grow': maps(constrained('flexGrows'), 'flex-grow'),
  'shrink': maps(constrained('flexShrinks'), 'flex-shrink'),
  'flex-shrink': maps(constrained('flexShrinks'), 'flex-shrink'),
  //'flex': (!!props.grow ? '1 1 auto' : null || 
  // !!props.shrink && props.shrink==='no' ? 'none' : null),
  
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
  console.log("Maps ", prop);
  return function(value) {
    /**
     * A value getter function.
     * @value: a prop value
     * @returns: the theme value if it exists, or null
     */
    let v = domainFn(value);
    return(v !== null ? `${prop}:${v}` : null);
  }
}
