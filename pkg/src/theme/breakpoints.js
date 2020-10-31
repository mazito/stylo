/**
 * A set of helper function for dealing with Breakpoints and Viewports
 * 
 * @created: mario.zito@treme.io - 2020-08-24
 */

export function sortBreakpoints(points) {
  /**
   * Creates valid viewports array from the Theme breakpoints.
   * @returns: an array of sorted viewports: [{ name: vw: }, ...]
   */
  // first add ALL (*) and Width=0 as first breakpoint point
  points['*'] = 0;

  // now build the array and sort by increasing width size
  let sorted = Object.keys(points)
    .map((p) => { 
      return { vw:points[p], name: p } 
    })
    .sort((a, b) => { 
      return (a.vw - b.vw)
    })

  return sorted ;
}


export function selectOnBp(options, vps) {
  /**
   * Selects an option based on the currently active breakpoints.
   * @options: the set of options to select from
   * @vps: active viewports
   * @returns: the option corresponding to the bigger available Viewport.
   */
  let selected = null ;

  const vw = document.body.clientWidth; // current Vw width in pixels

  for (var j=0; j < vps.length; j++) {

    if (vw > vps[j].vw) {
      // this breakpoint is active
      const bp = vps[j].name ;

      // lets see if we have an option for this one
      if (options[bp] !== undefined) selected = options[bp];

      // we dont end here because we must use the bigger posible breakpoint
    }
  }

  return (selected !== null) 
    // if an option was found, just return it
    ? selected 
    // else we try to return the '*' (all) option or null
    : (options['*'] || null)
}
