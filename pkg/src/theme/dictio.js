/**
 * Build a compacted (hashed) dictionary for the given Theme Specification.
 * After level 1 all next levels are concatenated.
 * 
 * @created: mario.zito@treme.io - 2010-08-16
 */

/*
  Example:
  
    colors: {
      primary: "#ef4801", 

      secondary: {
        '': '#28e997',
        '-': 'hsl(155, 81%, 70%)', // lighter
        '+': 'hsl(155, 81%, 50%)', // darker
      },
    }

  is compacted as:

    'colors.primary': "#ef4801", 
    'colors.secondary': '#28e997',
    'colors.secondary-': '#28e997',
    'colors.secondary+': 'hsl(155, 81%, 50%)',
  }
*/

export function compactLevel(key, original, level) {
  /**
   * Recursively compact it.
   * After level 1 all next levels are concatenated.
   */
  let d = {};
  level = level +1 ;

  Object.keys(original).map((k) => {

    if (typeof(original[k]) === 'string') {
      //if (!d[key]) d[key] = {} ;
      const sep = level > 2 ? '' : '.';
      const r = (k) ? key+sep+k : key ;
      d[r] = original[k];
    }

    else {
      let dl = compactLevel(key+(key?'.':'')+k, original[k], level) ;
      Object.keys(dl).map((t) => {
        d[t] = dl[t] ;
      })
    }
  })

  return d;
}
