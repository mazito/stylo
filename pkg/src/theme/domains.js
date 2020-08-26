/**
 * Domains manager
 * ---------------
 * 
 * Given a Theme, it builds a set of domains mapping props values 
 * to Theme values.
 * 
 * @created: mario.zito@treme.io - 2020-08-20
 */
import { compactLevel } from './dictio'
import { selectOnBp } from './breakpoints'

let _domains = {};

let _viewports = []; // sorted Viewports array defined by breakpoints

export function buildDomains(spec, extras) {
  _domains = compactLevel('', spec, 0)
  _viewports = spec.viewports; // fix it
}


/**
 * Domain functions
 * ----------------
 * 
 * They return a domain value getter function for the binded domain. 
 * Are used by others to bind a certain css property to a given domain, 
 * considering the domain type and restrictions.
 * 
 * **function domainFn(domain: string): function**
 * 
 * @domain: the domain to map.
 * @returns: the value getter (constrained, unconstrained, sized).
 * 
 * 
 * Domain value getters
 * --------------------
 * 
 * They return a Theme value 
 * if it exists or a valid value for the given domain,
 * considering its type:
 * 
 * A **constrained** getter accepts only values restricted
 * to the domain space, and will return Null otherwise.
 * Example: 'style' in the 'fontStyles' domain. 
 * 
 * An **unconstrained** getter will test if the value is in 
 * the domain space and return the Theme value if it exists,
 * but if not in the domain space will return the given value.
 * Example: 'border' prop in 'borders' domain.
 * 
 * A **sized** getter will test if the value is in the domain 
 * space and return the Theme value if it exists, but it will 
 * accept any value as long as it is using a size unit such 
 * as 'px' (or '%', 'em', 'rem', etc...). If a number is given
 * it will assume 'rem' units. 
 * Examples: 'p' prop in the 'spacing' domain, 'w' prop in the 
 * 'sizing' domain.
 */

export function constrained(domain) {
  /**
   * Use ONLY the theme value if it exists, 
   * else => ignore its value and return null
   */
  return function(val) {
    let vx = (typeof(val) === 'object') ? selectOnBp(val, _viewports) : val;
    return(
      (vx === null || vx === undefined) 
        ? null
        : _domains[`${domain}.${vx}`] || null
    )
  }
}

export function unconstrained(domain){
  /**
   *  Use the theme value if it exists, 
   *  else => use the given value as it was given 
   */ 
  return function(val) {
    let vx = (typeof(val) === 'object') ? selectOnBp(val, _viewports) : val;
    return(
      (vx === null || vx === undefined) 
        ? null
        : _domains[`${domain}.${vx}`] || vx
    )
  }
}

export function sized(domain) {
  /**
   * Use the theme value if it exists,
   * else if string => use the given value as it was given 
   * or if a number => convert it to rem units
   */
  return function(val) {
    let vx = (typeof(val) === 'object') ? selectOnBp(val, _viewports) : val;
    return (
      (vx === null || vx === undefined) 
        ? null
        : _domains[`${domain}.${vx}`] || measure(vx) || null
    )
  }
}

function measure(val) {
  /**
   * Evaluates a value to determine if it is has a valid unit,
   * or if we must assume rem units.
   */
  return (
    // can't use !val because in this particular case 
    // 0 is a valid value and must not be considered false.
    (val===undefined || val===null || val==='') 
      ? null
      : ((''+val).includes('%') || 
        (''+val).includes('px') || 
        (''+val).includes('pt') || 
        (''+val).includes('rem') ||
        (''+val).includes('em') ||
        (''+val).includes('ch') ||
        (''+val).includes('vmin') ||
        (''+val).includes('vmax') ||
        (''+val).includes('vw') ||
        (''+val).includes('vh'))
        ? val 
        : val+'rem'
  )
}
