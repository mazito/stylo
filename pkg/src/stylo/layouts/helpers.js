import Theme from './theme'
import theme from './theme';


export function randid() {
  /**
   * Returns a randomized ID of the form 'idXXXX'
   * where X is a Hexa digit (0..F)
   * @returns: string idXXXX
   */
  function randint(min, max) {
    return parseInt(min + Math.floor((max - min) * Math.random()))
  }
  return 'id'+(randint(0, 65535).toString(16))
}


function measure(value) {
  /**
   * Find if this measure is valid or has a value.
   * If not valid (undefine, null, '') @returns Null
   * If value but no units, force to 'rem' units, @returns 'value'+'unit'
   */
  if (value===undefined || value===null || value==="") return null;
  return (
    (value.includes('%') || 
     value.includes('px') || 
     value.includes('rem') ||
     value.includes('auto'))
    ? value 
    : value+'rem'
  )
}


export function shorthand(props, options) {
  for (var j=0; j < options.length; j++) {
    if (props[ options[j] ] !== undefined) {
      // la clave existe dentro de las props
      return options[j];
    }
  }
  return null;
}


export function toClasses(props) {
  return(''
    + (!!props.flex ? ' flexed' : '')
    + (!!props.transparent ? ' transparent' : '')
    + (!!props.hover ? ' hover' : '')
    + (Theme.wireframes() ? ' wireframe' : '')
  );
}


export function toStyles(props) {
  let s = "";

  const styles = {
    'width': measure(props.w),
    'max-width': measure(props.maxw) || measure(props.w),
    'height': measure(props.h),
    'max-height': measure(props.maxh) || measure(props.h),
    //
    'position': (!!props.fixed ? 'fixed' : null || 
                 !!props.absolute ? 'absolute' : null),
    'top': measure(props.top),
    'left': measure(props.left),
    'bottom': measure(props.bottom),
    'right': measure(props.right),
    //
    'padding': measure(props.p),
    'padding-left': measure(props.pl) || measure(props.px),
    'padding-right': measure(props.pr)|| measure(props.px),
    'padding-top': measure(props.pt)|| measure(props.py),
    'padding-bottom': measure(props.pb)|| measure(props.py),
    //
    'margin': measure(props.m),
    'margin-left': measure(props.ml) || measure(props.mx),
    'margin-right': measure(props.mr)|| measure(props.mx),
    'margin-top': measure(props.mt)|| measure(props.my),
    'margin-bottom': measure(props.mb)|| measure(props.my),
    //
    //
    'overflow': !!props.overflow ? props.overflow : null,
    'flex': (!!props.grow ? '1 1 auto' : null || 
             !!props.shrink && props.shrink==='no' ? 'none' : null),
    'align-items': !!props.flexItems ? props.flexItems : null,
    'justify-content': !!props.flexJustify ? props.flexJustify : null,
    //
    'color': props.color ? Theme.color(props.color) : null,
    'background-color': props.background ? Theme.color(props.background) : null,
    //
    'border-radius': (!!props.round ? '100%' : null ||
                      !!props.rounded ? measure(props.rounded) : null),
    'border': Theme.border(props.border) || null,
    'border-bottom': Theme.border(props.borderBottom) || null,
    'border-top': Theme.border(props.borderTop) || null,
    'border-left': Theme.border(props.borderLeft) || null,
    'border-right': Theme.border(props.borderRight) || null,
    'border-top-left-radius': measure(props.borderTopLeftRadius) || null,
    'border-bottom-left-radius': measure(props.borderBottomLeftRadius) || null,
    'border-top-right-radius': measure(props.borderTopRightRadius) || null,
    'border-bottom-right-radius': measure(props.borderBottomRightRadius) || null,
    //
    'box-shadow': Theme.shadow(props.elevation) || null,
    //
    'font-size': Theme.fontSize(props.fontSize) || measure(props.fontSize) || null,
    'font-weight': Theme.fontWeight(props.fontWeight) || null,
    'font-style': !!props.fontStyle ? props.fontStyle : null,
    //'text-decoration': Theme.fontStyle(props.fontWeight) || null,
    'text-align': (!!props.textAlign ? props.textAlign : null ||
                   !!props.align ? props.align : null),
    'vertical-alignment': !!props.verticalAlign ? props.verticalAlign : null,
    'white-space': !!props.noWrap ? 'nowrap' : null,
    'line-height': Theme.spacing(props.spacing) || measure(props.spacing) || null,
    //
    'cursor': !!props.pointer ? 'pointer' : null,
  }

  Object.keys(styles).map((t) => {
    s = styles[t] ? s+(t+':'+styles[t]+';') : s;
  })

  return s;
}

export function breakpoints(options) {

}

